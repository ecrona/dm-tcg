import { Actions, ActionTypes } from 'store/actions'
import { Card } from 'models/card'
import { Player } from '../models/player'
import { Phase } from '../models/phase'

export interface State {
  playerTurn: Player
  phase: Phase
}

const initialState: State = {
  playerTurn: Player.Me,
  phase: Phase.Mana
}

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.game.test:
      action.payload
    default:
      return state
  }
}
