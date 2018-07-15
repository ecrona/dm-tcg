import { ActionsUnion, createAction } from '@shared/utils/actions'
import { CardState } from '@shared/models/card'
import { Phase } from '@shared/models/phase'

export enum ActionTypes {
  setData = '[Game] Set data',
  selectCard = '[Game] Select card',
  changePhase = '[Game] Change phase',
  attack = '[Game] Attack',
  cancel = '[Game] Cancel'
}

export const actions = {
  setData: (cards: Array<CardState>) =>
    createAction(ActionTypes.setData, cards),
  selectCard: (localId: number) =>
    createAction(ActionTypes.selectCard, localId),
  changePhase: (phase: Phase, myTurn: boolean) =>
    createAction(ActionTypes.changePhase, { phase, myTurn }),
  attack: (attackerLocalId: number) =>
    createAction(ActionTypes.attack, attackerLocalId),
  cancel: () => createAction(ActionTypes.cancel)
}

export type Actions = ActionsUnion<typeof actions>
