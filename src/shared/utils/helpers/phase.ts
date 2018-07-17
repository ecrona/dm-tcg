import { CardState, Zone } from '@shared/models/card'
import { Phase, PhaseAction } from '@shared/models/phase'
import { Player } from '@shared/models/player'

export const canChangePhase = (
  playerId: number,
  turnPlayerId: number,
  phase: Phase,
  phaseAction: PhaseAction
) => turnPlayerId === playerId && phaseAction === PhaseAction.None

export const canCancel = (
  playerId: number,
  turnPlayerId: number,
  phase: Phase,
  phaseAction: PhaseAction
) => turnPlayerId === playerId && phaseAction !== PhaseAction.None

export const canChargeMana = (
  playerId: number,
  chargedManaAmount: number,
  card: CardState,
  phase: Phase,
  phaseAction: PhaseAction
) =>
  chargedManaAmount === 0 &&
  phase === Phase.Mana &&
  phaseAction === PhaseAction.None &&
  card.playerId === playerId &&
  card.zone === Zone.Hand

export const canSummon = (
  playerId: number,
  card: CardState,
  phase: Phase,
  phaseAction: PhaseAction
) =>
  phase === Phase.Summon &&
  phaseAction === PhaseAction.None &&
  card.playerId === playerId &&
  card.zone === Zone.Hand

export const canAttack = (
  playerId: number,
  card: CardState,
  phase: Phase,
  phaseAction: PhaseAction
) =>
  phase === Phase.Battle &&
  phaseAction === PhaseAction.None &&
  card.playerId === playerId &&
  card.zone === Zone.BattleZone &&
  !card.tapped

export const canBattle = (
  playerId: number,
  card: CardState,
  phase: Phase,
  phaseAction: PhaseAction
) =>
  phase === Phase.Battle &&
  phaseAction === PhaseAction.Attack &&
  card.playerId !== playerId &&
  card.zone === Zone.BattleZone
