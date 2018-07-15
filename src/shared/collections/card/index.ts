import {
  CardState,
  Creature,
  Card,
  CardType,
  AnyCard
} from '@shared/models/card'
import DM01 from './dm-01'
import { Empty } from './empty'

class CardCollection {
  private cards: Array<AnyCard> = [new Empty(), ...DM01]

  public findCreature(card: CardState): Creature {
    return this.cards.find(
      _card => _card.type === CardType.Creature && _card.id === card.cardTypeId
    ) as Creature
  }

  public find(card: CardState): AnyCard {
    return this.cards.find(_card => _card.id === card.cardTypeId)
  }

  /* Temporary */
  public random(): AnyCard {
    const cards = this.cards.filter(card => card.type !== CardType.Empty)
    return cards[Math.floor(Math.random() * cards.length)]
  }
}

export const cardCollection = new CardCollection()
