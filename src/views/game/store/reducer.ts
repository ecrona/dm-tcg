import { Actions, ActionTypes } from 'store/actions'
import { IdentifableCard, Zone } from 'models/card'
import { Phase, PhaseAction } from 'models/phase'

export interface State {
  myTurn: boolean
  phase: Phase
  phaseAction: PhaseAction
  selectedCardLocalId: number
  attackerCardLocalId: number
}

const initialState: State = {
  myTurn: true,
  phase: Phase.Summon,
  phaseAction: PhaseAction.None,
  selectedCardLocalId: 0,
  attackerCardLocalId: 0
}

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.game.selectCard:
      return { ...state, selectedCardLocalId: action.payload }
    case ActionTypes.game.changePhase:
      return {
        ...state,
        myTurn: action.payload.myTurn,
        phase: action.payload.phase
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
    default:
      return state
  }
}
