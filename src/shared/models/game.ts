import { Phase, PhaseAction } from './phase'
import { Player } from './player'

export interface LocalGame {
  me: Player
  them: Player
  turnPlayerId: number
  chargedManaAmount: number
  phase: Phase
  phaseAction: PhaseAction
}
