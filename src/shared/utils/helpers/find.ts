import { cardCollection } from '@shared/collections/card'
import { IdentifableCard, CardState, Zone } from '@shared/models/card'
import { EffectEvent } from '@shared/models/effects'
import { Player } from '@shared/models/player'

export const isCardState = (
  fromCard: IdentifableCard,
  toCard: IdentifableCard
) =>
  fromCard.playerId === toCard.playerId &&
  fromCard.zone === toCard.zone &&
  fromCard.order === toCard.order

export const findCardState = (cards: Array<CardState>, card: IdentifableCard) =>
  cards.find(cardState => isCardState(cardState, card))

export const findCardStateByLocalId = (
  cards: Array<CardState>,
  localId: number
) => cards.find(cardState => cardState.localId === localId)

export const getZoneTopOrder = (
  cards: Array<CardState>,
  playerId: number,
  zone: Zone
) => {
  return Math.max(
    -1,
    ...cards
      .filter(card => card.playerId === playerId && card.zone === zone)
      .map(card => card.order)
  )
}
