import { IdentifableCard, CardState, Zone } from '@shared/models/card'
import { isCardState, findCardState, getZoneTopOrder } from './find'

export const moveZoneToZone = (
  cards: Array<CardState>,
  from: Zone,
  to: Zone
) => {
  const fromCards = cards.filter(card => card.zone === from)

  if (!fromCards.length) {
    throw new Error('No cards in the requested zone')
  }

  return cards.map(card => {
    if (findCardState(fromCards, card)) {
      return { ...card, zone: to }
    }

    return card
  })
}

export const moveCardToZone = (
  cards: Array<CardState>,
  card: IdentifableCard,
  to: Zone
) => {
  const topOrder = getZoneTopOrder(cards, card.playerId, to)

  return cards.map(_card => {
    if (isCardState(_card, card)) {
      // Replace the zone of the selected card
      return { ..._card, zone: to, order: topOrder + 1 }
    } else if (
      _card.playerId === card.playerId &&
      _card.zone === card.zone &&
      _card.order > card.order
    ) {
      // Close the gap in the order of the selected card's previous zone
      return { ..._card, order: _card.order - 1 }
    }

    return _card
  })
}
