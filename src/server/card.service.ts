import { Component } from '@nestjs/common'

import { CardState, Zone, CardType } from '@shared/models/card'
import { cardCollection } from '@shared/collections/card'
import { WsException } from '@nestjs/websockets'

interface CardContainer {
  gameId: number
  cards: Array<CardState>
}

const adjustOrder = (card, index) => ({ ...card, order: index })

let localId = 0

const myDeck: Array<CardState> = Array.apply(null, { length: 40 }).map(_ => {
  const card = cardCollection.random()

  return {
    localId: ++localId,
    playerId: 1,
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
    playerId: 2,
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
  public readonly cardContainers: Array<CardContainer> = [{ gameId: 1, cards }]

  private getCardContainer(gameId: number) {
    const cardContainer = this.cardContainers.find(
      cardContainer => cardContainer.gameId === gameId
    )

    if (!cardContainer) throw new WsException('Card container not found')

    return cardContainer
  }

  public getCards(gameId: number) {
    return this.getCardContainer(gameId).cards
  }

  public getMaskedCards(gameId: number, playerId: number) {
    const maskedZones = [Zone.Hand, Zone.ShieldZone]
    return this.getCards(gameId).map(
      card =>
        card.zone === Zone.Deck ||
        (card.playerId !== playerId && maskedZones.includes(card.zone))
          ? { ...card, cardTypeId: 'empty' }
          : card
    )
  }

  public setCards(gameId: number, cards: Array<CardState>) {
    const cardContainer = this.getCardContainer(gameId)
    cardContainer.cards = cards
  }
}
