import { CardState, Zone, CardType } from 'models/card'
import { cardCollection } from 'collections/card'
import { Actions, ActionTypes } from '../actions'
import { battle } from 'utils/helpers/battle'
import { moveCardToZone } from 'utils/helpers/move'

export type State = Array<CardState>
const adjustOrder = (card, index) => ({ ...card, order: index })

let localId = 0

const myDeck = Array.apply(null, { length: 40 }).map(_ => {
  const card = cardCollection.random()

  return {
    localId: ++localId,
    mine: true,
    cardTypeId: card.id,
    zone: Zone.Deck,
    order: 0,
    tapped: false,
    eventEffects: [],
    statEffects: []
  }
})

const myHand = myDeck.splice(0, 5).map(card => ({ ...card, zone: Zone.Hand }))
const myShieldZone = myDeck
  .splice(0, 5)
  .map(card => ({ ...card, zone: Zone.ShieldZone }))

const theirDeck = Array.apply(null, { length: 40 }).map(_ => {
  const card = cardCollection.random()
  return {
    localId: ++localId,
    mine: false,
    cardTypeId: card.id,
    zone: Zone.Deck,
    order: 0,
    tapped: false,
    eventEffects: [],
    statEffects: []
  }
})

const theirHand = theirDeck
  .splice(0, 5)
  .map(card => ({ ...card, zone: Zone.Hand }))
const theirShieldZone = theirDeck
  .splice(0, 5)
  .map(card => ({ ...card, zone: Zone.ShieldZone }))
const theirBattleZone = theirDeck
  .splice(0, 3)
  .map(card => ({ ...card, zone: Zone.BattleZone }))

const initialState: State = [
  ...myDeck.map(adjustOrder),
  ...myHand.map(adjustOrder),
  ...myShieldZone.map(adjustOrder),
  ...theirDeck.map(adjustOrder),
  ...theirHand.map(adjustOrder),
  ...theirShieldZone.map(adjustOrder),
  ...theirBattleZone.map(adjustOrder)
]

console.log(initialState)

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.cards.putToManaZone:
      return moveCardToZone(state, action.payload, Zone.ManaZone)
    case ActionTypes.cards.putToBattleZone:
      return moveCardToZone(state, action.payload, Zone.BattleZone)
    case ActionTypes.cards.battle:
      return battle(state, action.payload.attacker, action.payload.target)
    default:
      return state
  }
}
