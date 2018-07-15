import { ActionCreatorsMapObject } from 'redux'
import { State } from 'store/reducers'

interface Action<T extends string> {
  type: T
}

interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P
}

type Dispatchable =
  | ThunkAction
  | Action<string>
  | ActionWithPayload<string, any>

interface Dispatch {
  (action: Dispatchable): void
}

export type ThunkAction = (
  dispatch: Dispatch,
  getState: () => State,
  endpoints: any
) => void

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<
  A[keyof A]
>

export function createAction<T extends string>(type: T): Action<T>
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload }
}
