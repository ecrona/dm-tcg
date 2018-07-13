import { CardState, Creature, Card, CardType, AnyCard } from 'models/card'
import DM01 from './dm-01'
import { Empty } from './empty'

class CardCollection {
  private cards: Array<AnyCard> = [new Empty(), ...DM01]

  public findCreature(card: CardState): Creature {
    return this.cards.find(
      _card => _card.type === CardType.Creature && _card.id === card.id
    ) as Creature
  }

  public find(card: CardState): AnyCard {
    return this.cards.find(_card => _card.id === card.cardTypeId)
  }

  /* Temporary */
  public random(): AnyCard {
    return this.cards[Math.floor(Math.random() * this.cards.length)]
  }
}

export const cardCollection = new CardCollection()
