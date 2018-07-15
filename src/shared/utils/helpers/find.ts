import { cardCollection } from '@shared/collections/card'
import { IdentifableCard, CardState, Zone } from '@shared/models/card'
import { EffectEvent } from '@shared/models/effects'

export const isCardState = (
  fromCard: IdentifableCard,
  toCard: IdentifableCard
) =>
  fromCard.mine === toCard.mine &&
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
  mine: boolean,
  zone: Zone
) => {
  return Math.max(
    -1,
    ...cards
      .filter(card => card.mine === mine && card.zone === zone)
      .map(card => card.order)
  )
}
