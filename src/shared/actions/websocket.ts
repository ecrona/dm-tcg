import { ActionsUnion, createAction } from '@shared/utils/actions'

export enum ActionTypes {
  connect = '[Websockets] Connect',
  open = '[Websockets] Open',
  close = '[Websockets] Close',
  send = '[Websockets] Send',
  disconnect = '[Websockets] Disconnect'
}

export const actions = {
  connect: () => createAction(ActionTypes.connect),
  open: () => createAction(ActionTypes.open),
  close: (code: number) => createAction(ActionTypes.close, code),
  send: () => createAction(ActionTypes.send),
  disconnect: () => createAction(ActionTypes.disconnect)
}

export type Actions = ActionsUnion<typeof actions>
