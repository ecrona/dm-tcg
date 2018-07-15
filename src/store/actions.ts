import {
  ActionTypes as CardsActionTypes,
  Actions as CardsActions
} from './cards/actions'
import {
  ActionTypes as GameActionTypes,
  Actions as GameActions
} from 'views/game/store/actions'

export const ActionTypes = {
  cards: CardsActionTypes,
  game: GameActionTypes
}

export type Actions = CardsActions | GameActions
