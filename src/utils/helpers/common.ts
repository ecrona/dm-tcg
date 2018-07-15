import { CardState } from 'models/card'
import { findCardState } from './find'

export const revealCards = (
  cards: Array<CardState>,
  revealedCards: Array<CardState>
) => {
  return cards.map(card => {
    const revealedCard = findCardState(revealedCards, card)
    if (revealedCard) {
      // Replace the zone of the selected card
      return { localId: card.localId, ...revealedCard }
    }

    return card
  })
}

// Draw
// Request new card
// Reveal cards
// Move cards -> hand
