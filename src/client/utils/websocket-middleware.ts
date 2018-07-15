import * as io from 'socket.io-client'
import { Middleware } from 'redux'

import { ActionTypes, actions, Actions } from '@shared/actions/websocket'
import { State } from 'store/reducers'

let socket: SocketIOClient.Socket

/**
 * An example middleware to handle WebSocket connections.
 * NB: There is no exception handling!
 */
export const websocketMiddleware: Middleware<
  {},
  State
> = store => next => action => {
  switch (action.type) {
    case ActionTypes.connect:
      console.log('connect')
      socket = io('http://localhost:3001')
      ;(window as any).k = socket

      /*websocket.onopen = () =>
        console.log('open!') || store.dispatch(actions.open())
      websocket.onerror = () => console.log('error!')
      websocket.onclose = event => store.dispatch(actions.close(event.code))
      websocket.onmessage = (event: Actions) =>
        console.log(event) || store.dispatch(event)*/

      socket.on(
        'connect',
        () => console.log('open') || store.dispatch(actions.open())
      )
      socket.on('event', data => store.dispatch(data))
      socket.on('disconnect', () => console.log('d'))

      break

    case ActionTypes.open:
      if (!store.getState().cards.length) {
        socket.emit('game/get-data')
      }
      break

    case ActionTypes.send:
      socket.send(JSON.stringify(action.payload))
      break

    case ActionTypes.disconnect:
      socket.close()
      break

    default:
      break
  }

  return next(action)
}
