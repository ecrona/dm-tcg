import {
  TemporaryEventEffect,
  TemporaryStatEffect,
  SpellEffect,
  EventEffect,
  StatEffect,
  Effect,
  EffectEvent,
  EffectStat
} from './effects'
import { cardCollection } from 'collections/card'

export enum Zone {
  Deck,
  Hand,
  BattleZone,
  ManaZone,
  ShieldZone,
  Graveyard
}

export enum CardType {
  Creature,
  Spell,
  Shield
}

export type AnyCard = Spell | Creature | EmptyCard

export enum Civilization {
  Light,
  Water,
  Darkness,
  Fire,
  Nature
}

export interface CardState {
  id: string
  mine: boolean
  cardTypeId: string
  zone: Zone
  order: number

  tapped: boolean
  eventEffects: Array<TemporaryEventEffect>
  statEffects: Array<TemporaryStatEffect>
}

export abstract class Card {
  public id: string
  public name: string
  public readonly type: CardType
  public civilization: Civilization
  public manaCost = 1
  public manaNumber = 1
  public shieldTrigger = false
}

abstract class Shield extends Card {
  public readonly type = CardType.Shield
}

abstract class Spell extends Card {
  public readonly type = CardType.Spell
  protected eventEffects: Array<SpellEffect> = []
}

export class Creature extends Card {
  public readonly type = CardType.Creature
  protected power = 1000
  protected extraPower = 0
  protected canAttackCreatures = true
  protected canAttackPlayers = true
  protected canAttackUntappedCreatured = true
  protected mustAttackEveryRound = false
  protected blocker = false
  protected unblockable = false
  protected shieldBreakAmount = 1
  public eventEffects: Array<EventEffect> = []
  public statEffects: Array<StatEffect> = []

  public getAttackPower() {
    return this.power + this.extraPower
  }

  public getDefensePower() {
    return this.power
  }

  public canAttack(target: Card) {
    return (
      (target.type === CardType.Shield && this.canAttackPlayers) ||
      (target.type === CardType.Creature && this.canAttackCreatures)
    )
  }

  public canBeBlocked() {
    return !this.unblockable
  }
}

export class EmptyCard extends Card {}

/*
class TestEffect implements Effect {
  id: 'slayer'
  public dispatch(cards: Array<CardState>) {
    return cards
  }
}

class Test extends Creature {
  public shieldBreakAmount = 2
  public eventEffects: Array<SpellEffect> = [
    {
      effect: new TestEffect(),
      event: EffectEvent.Summoned,
      conditions: []
    }
  ]
}

const collection = cardCollection

const getAttackPower = (attacker: CardState) => {
  const card = collection.findCreature(attacker)
  return (
    card.getAttackPower() +
    attacker.statEffects
      .filter(
        effect =>
          effect.stat === EffectStat.Power ||
          effect.stat === EffectStat.ExtraPower
      )
      .reduce((previous, effect) => previous + effect.value, 0)
  )
}

const battleAction = (victor: CardState, loser: CardState) => {}

const reducer = (cards: Array<CardState>) => {
  // case battleAction
  let cardsState = cards
  cardsState = collection.moveCardToZone(
    cardsState,
    action.loser,
    Zone.Graveyard
  )
  cardsState = collection.postBattleEffects(cardsState, action.victor)
  return { ...{}, cards: cardsState }
}

const battle = (attacker: CardState, defender: CardState) => {
  const attackerCard = collection.findCreature(attacker)
  const defenderCard = collection.findCreature(defender)

  if (attackerCard.getAttackPower() > defenderCard.getDefensePower()) {
    dispatch(battleAction(attacker, defender))
  } else {
    dispatch(battleAction(defender, attacker))
  }
}
*/
