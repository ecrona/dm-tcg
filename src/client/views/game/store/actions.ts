import { ThunkAction } from 'store'
import { actions as cardsActions } from '@shared/actions/cards'
import { actions as gameActions } from '@shared/actions/game'
import { cardCollection } from '@shared/collections/card'
import { Zone, IdentifableCard, CardState } from '@shared/models/card'
import { Phase, PhaseAction } from '@shared/models/phase'
import {
  getZoneTopOrder,
  findCardStateByLocalId
} from '@shared/utils/helpers/find'

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
        return dispatch(gameActions.attack(state.game.selectedCardLocalId))
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

    dispatch(gameActions.changePhase(nextPhase, myTurnNext))
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
