import * as io from 'socket.io-client'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createSocketIoMiddleware from 'redux-socket.io'
import { websocketMiddleware } from 'utils/websocket-middleware'
import { rootReducer } from './reducers'

const socket = io('http://localhost:3001')
//const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')

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
