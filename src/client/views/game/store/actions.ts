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
import { actions } from '@shared/actions/websocket'

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
        return dispatch(chargeMana())
      case Phase.Summon:
        return dispatch(summon())
      case Phase.Battle:
        return dispatch(gameActions.attack(state.game.selectedCardLocalId))
    }
  }
}

export const chargeMana = (): ThunkAction => {
  return (dispatch, getState, endpoints) => {
    const state = getState()
    const selectedCard = findCardStateByLocalId(
      state.cards,
      state.game.selectedCardLocalId
    )

    dispatch(actions.send('game/charge-mana', selectedCard))
  }
}

export const summon = (): ThunkAction => {
  return (dispatch, getState, endpoints) => {
    const state = getState()
    const selectedCard = findCardStateByLocalId(
      state.cards,
      state.game.selectedCardLocalId
    )

    dispatch(cardsActions.summon(selectedCard))
  }
}

export const nextPhase = (): ThunkAction => {
  return (dispatch, getState, endpoints) => {
    dispatch(actions.send('game/next-phase'))
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
