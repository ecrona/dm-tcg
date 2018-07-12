import { combineReducers } from 'redux'

// Data sources
import cardsReducer, { State as CardsState } from './cards/reducer'
import gameReducer, { State as GameState } from 'views/game/store/reducer'

// Views

export interface State {
  // Data sources
  cards: CardsState

  // Views
  game: GameState
}

export const rootReducer = combineReducers({
  // Data soruces
  cards: cardsReducer,

  // Views
  game: gameReducer
})
