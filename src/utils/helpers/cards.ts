import { CardState, Zone } from 'models/card'
import { EffectEvent } from 'models/effects'
import { cardCollection } from 'collections/card'

export const moveZoneToZone = (
  cards: Array<CardState>,
  from: Zone,
  to: Zone
) => {
  const fromCards = cards.filter(card => card.zone === from)

  if (!fromCards.length) {
    throw new Error('No cards in the requested zone')
  }

  return this.cards.map(card => {
    if (fromCards.find(_card => _card.id === card.id)) {
      return { ...card, zone: to }
    }

    return card
  })
}

export const moveCardToZone = (
  cards: Array<CardState>,
  card: CardState,
  to: Zone
) => {
  return cards.map(_card => {
    if (_card.id === card.id) {
      return { ..._card, zone: to }
    }

    return _card
  })
}

export const postBattleEffects = (
  cards: Array<CardState>,
  victor: CardState
): Array<CardState> => {
  const creature = cardCollection.findCreature(victor)
  const eventEffects = creature.eventEffects
    .filter(eventEffect => eventEffect.event === EffectEvent.Victorious)
    .filter(eventEffect =>
      eventEffect.conditions.filter(condition => condition.dispatch(cards))
    )

  if (eventEffects.some(eventEffect => eventEffect.preventDefault)) {
    return cards
  } else {
    return cards.map(_card => {
      if (_card.id === victor.id) {
        return { ..._card, tapped: true }
      }

      return _card
    })
  }
}
