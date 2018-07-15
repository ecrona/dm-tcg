import { CardState, Zone, CardType } from '@shared/models/card'
import { cardCollection } from '@shared/collections/card'
import { Actions, ActionTypes } from '@shared/actions'
import { battle } from '@shared/utils/helpers/battle'
import { moveCardToZone } from '@shared/utils/helpers/move'

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
  /*...myDeck.map(adjustOrder),
  ...myHand.map(adjustOrder),
  ...myShieldZone.map(adjustOrder),
  ...theirDeck.map(adjustOrder),
  ...theirHand.map(adjustOrder),
  ...theirShieldZone.map(adjustOrder),
  ...theirBattleZone.map(adjustOrder)*/
]

console.log(initialState)

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.game.setData:
      return action.payload
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
