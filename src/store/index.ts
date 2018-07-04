import { combineReducers } from 'redux'

// Data sources
import cardsReducer, { State as CardsState } from './cards/reducer'

// Features

export interface State {
  // Data sources
  cards: CardsState

  // Features
}

export const rootReducer = combineReducers({
  // Data soruces
  cards: cardsReducer

  // Features
})
