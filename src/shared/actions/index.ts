import {
  ActionTypes as WebsocketActionTypes,
  Actions as WebsocketActions
} from './websocket'
import {
  ActionTypes as CardsActionTypes,
  Actions as CardsActions
} from './cards'
import { ActionTypes as GameActionTypes, Actions as GameActions } from './game'

export const ActionTypes = {
  websocket: WebsocketActionTypes,
  cards: CardsActionTypes,
  game: GameActionTypes
}

export type Actions = WebsocketActions | CardsActions | GameActions
