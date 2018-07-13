import { CardState, Zone } from 'models/card'
import { cardCollection } from 'collections/card'

export type State = Array<CardState>

type Action = any

const myDeck = Array.apply(null, { length: 39 }).map(_ => ({
  id: '',
  mine: true,
  cardTypeId: cardCollection.random().id,
  zone: Zone.Deck,
  order: 0,
  tapped: false,
  eventEffects: [],
  statEffects: []
}))
const myHand = myDeck.splice(0, 5).map(card => ({ ...card, zone: Zone.Hand }))
const myShieldZone = myDeck
  .splice(0, 5)
  .map(card => ({ ...card, zone: Zone.ShieldZone }))

const theirDeck = Array.apply(null, { length: 39 }).map(_ => ({
  id: '',
  mine: false,
  cardTypeId: cardCollection.random().id,
  zone: Zone.Deck,
  order: 0,
  tapped: false,
  eventEffects: [],
  statEffects: []
}))
const theirHand = theirDeck
  .splice(0, 5)
  .map(card => ({ ...card, zone: Zone.Hand }))
const theirShieldZone = theirDeck
  .splice(0, 5)
  .map(card => ({ ...card, zone: Zone.ShieldZone }))

const initialState: State = [
  ...myDeck,
  ...myHand,
  ...myShieldZone,
  ...theirDeck,
  ...theirHand,
  ...theirShieldZone
]

console.log(myDeck.slice(0, 4))

export default function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    default:
      return state
  }
}
