import { CardState, Creature, Card, CardType, AnyCard } from 'models/card'
import DM01 from './dm-01'

class CardCollection {
  private cards: Array<AnyCard> = [...DM01]

  public findCreature(card: CardState): Creature {
    return this.cards.find(
      _card => _card.type === CardType.Creature && _card.id === card.id
    ) as Creature
  }
}

export const cardCollection = new CardCollection()
