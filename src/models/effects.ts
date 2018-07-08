import { CardState } from './card'

export interface Effect {
  dispatch(cards: Array<CardState>): Array<CardState>
}

export interface EffectCondition {
  dispatch(cards: Array<CardState>): boolean
}

export enum EffectEvent {
  Summoned,
  Victorious,
  Defeated,
  EndTurn
}

export enum EffectStat {
  Power,
  ExtraPower,
  CanBeBlocked,
  ShieldBreakAmount,
  MayBeAttacked
}

export interface EventEffect {
  effect: Effect
  event: EffectEvent
  conditions: Array<EffectCondition>
  preventDefault?: boolean
}

export interface SpellEffect {
  effect: Effect
  event: EffectEvent.Summoned
  conditions: Array<EffectCondition>
}

export interface StatEffect {
  effect: Effect
  stat: EffectStat
  conditions: Array<EffectCondition>
}

export interface TemporaryStatEffect {
  stat: EffectStat
  value: number
}

export interface TemporaryEventEffect {
  effectId: string
}
