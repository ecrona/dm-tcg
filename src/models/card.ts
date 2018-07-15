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
  Empty,
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

export interface IdentifableCard {
  mine: boolean
  zone: Zone
  order: number
}

export interface CardState extends IdentifableCard {
  localId: number
  cardTypeId: string
  tapped: boolean
  eventEffects: Array<TemporaryEventEffect>
  statEffects: Array<TemporaryStatEffect>
}

export interface CardViewState {
  localId: number
  name: string
  selectable: boolean
  tapped: boolean
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

export class EmptyCard extends Card {
  public readonly type = CardType.Empty
}
