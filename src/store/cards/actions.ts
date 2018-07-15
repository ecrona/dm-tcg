import { ActionsUnion, createAction } from 'store'
import { IdentifableCard, CardState, Zone } from 'models/card'

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
