import { ActionsUnion, createAction } from '@shared/utils/actions'
import { IdentifableCard, CardState, Zone } from '@shared/models/card'

export enum ActionTypes {
  putToManaZone = '[Cards] Put to mana zone',
  putToBattleZone = '[Cards] Put to battle zone',
  battle = '[Cards] Battle'
}

export const actions = {
  putToManaZone: (card: IdentifableCard) =>
    createAction(ActionTypes.putToManaZone, card),
  putToBattleZone: (card: IdentifableCard) =>
    createAction(ActionTypes.putToBattleZone, card),
  battle: (attacker: CardState, target: CardState) =>
    createAction(ActionTypes.battle, { attacker, target })
}

export type Actions = ActionsUnion<typeof actions>
