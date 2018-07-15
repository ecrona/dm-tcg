import { ActionsUnion, ThunkAction, createAction } from 'store'
import { cardCollection } from 'collections/card'
import { IdentifableCard, Zone } from 'models/card'
import { Phase, PhaseAction } from 'models/phase'
import { getZoneTopOrder, findCardStateByLocalId } from 'utils/helpers/find'
import { actions as cardsActions } from 'store/cards/actions'

export enum ActionTypes {
  selectCard = '[Game] Select card',
  changePhase = '[Game] Change phase',
  attack = '[Game] Attack',
  cancel = '[Game] Cancel'
}

export const actions = {
  selectCard: (localId: number) =>
    createAction(ActionTypes.selectCard, localId),
  changePhase: (phase: Phase, myTurn: boolean) =>
    createAction(ActionTypes.changePhase, { phase, myTurn }),
  attack: (attackerLocalId: number) =>
    createAction(ActionTypes.attack, attackerLocalId),
  cancel: () => createAction(ActionTypes.cancel)
}

export const runCardAction = (): ThunkAction => {
  return (dispatch, getState, endpoints) => {
    const state = getState()
    const selectedCard = findCardStateByLocalId(
      state.cards,
      state.game.selectedCardLocalId
    )

    switch (state.game.phaseAction) {
      case PhaseAction.Attack:
        return dispatch(battle())
    }

    switch (state.game.phase) {
      case Phase.Mana:
        return dispatch(putToManaZone())
      case Phase.Summon:
        return dispatch(putToBattleZone())
      case Phase.Battle:
        return dispatch(actions.attack(state.game.selectedCardLocalId))
    }
  }
}

export const putToManaZone = (): ThunkAction => {
  return (dispatch, getState, endpoints) => {
    const state = getState()
    const selectedCard = findCardStateByLocalId(
      state.cards,
      state.game.selectedCardLocalId
    )

    dispatch(cardsActions.putToManaZone(selectedCard))
  }
}

export const putToBattleZone = (): ThunkAction => {
  return (dispatch, getState, endpoints) => {
    const state = getState()
    const selectedCard = findCardStateByLocalId(
      state.cards,
      state.game.selectedCardLocalId
    )

    dispatch(cardsActions.putToBattleZone(selectedCard))
  }
}

export const nextPhase = (): ThunkAction => {
  return (dispatch, getState, endpoints) => {
    const state = getState()
    let nextPhase = Phase.Start
    let myTurnNext = true

    switch (state.game.phase) {
      case Phase.Start:
        nextPhase = Phase.Mana
        break
      case Phase.Mana:
        nextPhase = Phase.Summon
        break
      case Phase.Summon:
        nextPhase = Phase.Battle
        break
      case Phase.Battle:
        nextPhase = Phase.Start
        myTurnNext = false
    }

    dispatch(actions.changePhase(nextPhase, myTurnNext))
  }
}

export const battle = (): ThunkAction => {
  return (dispatch, getState, endpoints) => {
    const state = getState()
    const attacker = findCardStateByLocalId(
      state.cards,
      state.game.attackerCardLocalId
    )
    const target = findCardStateByLocalId(
      state.cards,
      state.game.selectedCardLocalId
    )

    dispatch(cardsActions.battle(attacker, target))
  }
}

export type Actions = ActionsUnion<typeof actions>
