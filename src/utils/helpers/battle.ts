import { cardCollection } from 'collections/card'
import { CardState, Zone } from 'models/card'
import { EffectEvent } from 'models/effects'
import { isCardState } from './find'
import { moveCardToZone } from './move'

export const battle = (
  cards: Array<CardState>,
  attacker: CardState,
  target: CardState
) => {
  const attackerCard = cardCollection.findCreature(attacker)
  const targetCard = cardCollection.findCreature(target)

  let targetDefeated = false
  if (attackerCard.getAttackPower() > targetCard.getDefensePower()) {
    targetDefeated = true
  }

  const victorious = targetDefeated ? attacker : target
  const defeated = targetDefeated ? target : attacker

  // Move defeated card to the graveryard, and tap the victorious card
  return moveCardToZone(cards, defeated, Zone.Graveyard).map(
    card => (isCardState(card, victorious) ? { ...card, tapped: true } : card)
  )
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
      if (isCardState(_card, victor)) {
        return { ..._card, tapped: true }
      }

      return _card
    })
  }
}
