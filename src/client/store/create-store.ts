import * as io from 'socket.io-client'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { rootReducer } from './reducers'
import { websocketMiddleware } from 'utils/websocket-middleware'

declare let module: { hot: any }

export default function configureStore() {
  const middleware = applyMiddleware(
    thunkMiddleware.withExtraArgument(fetch),
    websocketMiddleware,
    createLogger()
  )
  const store = createStore(rootReducer, middleware)

  if (module.hot) {
    module.hot.accept('./index.ts', () => {
      const { rootReducer: nextRootReducer } = require('./index.ts')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
