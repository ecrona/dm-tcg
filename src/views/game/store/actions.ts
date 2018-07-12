import { ActionsUnion, ThunkAction, createAction } from 'store'

export enum ActionTypes {
  test = '[game] test',
  another = '[game] another'
}

export const actions = {
  test: (asd: number, shit: string) =>
    createAction(ActionTypes.test, { asd, shit }),
  another: (stuff: string) => createAction(ActionTypes.another, stuff)
}

export const test = (): ThunkAction => {
  return (dispatch, getState, endpoints) => {}
}

export type Actions = ActionsUnion<typeof actions>
