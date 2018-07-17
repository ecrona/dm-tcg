import { CardState } from '@shared/models/card'
import { Player } from '@shared/models/player'
import { findCardState } from './find'

export const isMine = (player: Player, card: CardState) =>
  player.id === card.playerId

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
