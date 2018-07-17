import { ActionsUnion, createAction } from '@shared/utils/actions'
import { IdentifableCard, CardState, Zone } from '@shared/models/card'

export enum ActionTypes {
  chargeMana = '[Cards] Charge mana',
  summon = '[Cards] Summon',
  battle = '[Cards] Battle'
}

export const actions = {
  chargeMana: (card: IdentifableCard) =>
    createAction(ActionTypes.chargeMana, card),
  summon: (card: IdentifableCard) => createAction(ActionTypes.summon, card),
  battle: (attacker: CardState, target: CardState) =>
    createAction(ActionTypes.battle, { attacker, target })
}

export type Actions = ActionsUnion<typeof actions>
