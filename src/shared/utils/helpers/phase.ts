import { CardState, Zone } from '@shared/models/card'
import { Phase, PhaseAction } from '@shared/models/phase'

export const canChargeMana = (
  card: CardState,
  phase: Phase,
  phaseAction: PhaseAction
) =>
  phase === Phase.Mana &&
  phaseAction === PhaseAction.None &&
  card.mine &&
  card.zone === Zone.Hand

export const canSummon = (
  card: CardState,
  phase: Phase,
  phaseAction: PhaseAction
) =>
  phase === Phase.Summon &&
  phaseAction === PhaseAction.None &&
  card.mine &&
  card.zone === Zone.Hand

export const canAttack = (
  card: CardState,
  phase: Phase,
  phaseAction: PhaseAction
) =>
  phase === Phase.Battle &&
  phaseAction === PhaseAction.None &&
  card.mine &&
  card.zone === Zone.BattleZone &&
  !card.tapped

export const canBattle = (
  card: CardState,
  phase: Phase,
  phaseAction: PhaseAction
) =>
  phase === Phase.Battle &&
  phaseAction === PhaseAction.Attack &&
  !card.mine &&
  card.zone === Zone.BattleZone
