import { Card } from './card'

enum Phase {
  Mana,
  Summon,
  Battle
}

export interface PlayerState {
  id: number
  phase: Phase
  target: Card | null
}
