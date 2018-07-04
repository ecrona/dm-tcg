import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import plainify from 'redux-plainify'
import { createLogger } from 'redux-logger'
import { rootReducer } from 'store'

declare let module: { hot: any }

export default function configureStore() {
  const middleware = applyMiddleware(
    thunkMiddleware.withExtraArgument(fetch),
    plainify,
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
