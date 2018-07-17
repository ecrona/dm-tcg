import { ActionsUnion, createAction } from '@shared/utils/actions'
import { CardState } from '@shared/models/card'
import { LocalGame } from '@shared/models/game'
import { Phase } from '@shared/models/phase'
import { Player } from '@shared/models/player'

export enum ActionTypes {
  setData = '[Game] Set data',
  selectCard = '[Game] Select card',
  changePhase = '[Game] Change phase',
  attack = '[Game] Attack',
  cancel = '[Game] Cancel'
}

export const actions = {
  setData: (game: LocalGame, cards: Array<CardState>) =>
    createAction(ActionTypes.setData, { game, cards }),
  selectCard: (localId: number) =>
    createAction(ActionTypes.selectCard, localId),
  changePhase: (
    phase: Phase,
    turnPlayerId: number,
    chargedManaAmount: number
  ) =>
    createAction(ActionTypes.changePhase, {
      phase,
      turnPlayerId,
      chargedManaAmount
    }),
  attack: (attackerLocalId: number) =>
    createAction(ActionTypes.attack, attackerLocalId),
  cancel: () => createAction(ActionTypes.cancel)
}

export type Actions = ActionsUnion<typeof actions>
