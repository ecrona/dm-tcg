import { Component } from '@nestjs/common'

import { CardState, Zone, CardType } from '@shared/models/card'
import { cardCollection } from '@shared/collections/card'

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

const cards = [
  ...myDeck.map(adjustOrder),
  ...myHand.map(adjustOrder),
  ...myShieldZone.map(adjustOrder),
  ...theirDeck.map(adjustOrder),
  ...theirHand.map(adjustOrder),
  ...theirShieldZone.map(adjustOrder),
  ...theirBattleZone.map(adjustOrder)
]

@Component()
export class CardService {
  public readonly cards: Array<CardState> = cards
}
