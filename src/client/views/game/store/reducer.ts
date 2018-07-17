import { Actions, ActionTypes } from '@shared/actions'
import { LocalGame } from '@shared/models/game'
import { Phase, PhaseAction } from '@shared/models/phase'

export interface State extends LocalGame {
  selectedCardLocalId: number
  attackerCardLocalId: number
}

const initialState: State = {
  me: { id: 1, name: 'Eddie' },
  them: { id: 2, name: 'Olle' },
  turnPlayerId: 1,
  phase: Phase.Summon,
  phaseAction: PhaseAction.None,
  chargedManaAmount: 0,
  selectedCardLocalId: 0,
  attackerCardLocalId: 0
}

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.game.setData:
      return { ...state, ...action.payload.game }
    case ActionTypes.game.selectCard:
      return { ...state, selectedCardLocalId: action.payload }
    case ActionTypes.game.changePhase:
      return {
        ...state,
        turnPlayerId: action.payload.turnPlayerId,
        phase: action.payload.phase,
        chargedManaAmount: action.payload.chargedManaAmount
      }
    case ActionTypes.game.attack:
      return {
        ...state,
        phaseAction: PhaseAction.Attack,
        attackerCardLocalId: action.payload
      }
    case ActionTypes.game.cancel:
    case ActionTypes.cards.battle:
      return { ...state, phaseAction: PhaseAction.None, attackerCardLocalId: 0 }
    case ActionTypes.cards.chargeMana:
      return { ...state, chargedManaAmount: state.chargedManaAmount + 1 }
    default:
      return state
  }
}
