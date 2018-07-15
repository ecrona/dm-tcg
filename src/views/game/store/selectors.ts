import { createSelector } from 'reselect'
import { State } from 'store/reducers'
import { cardCollection } from 'collections/card'
import { Zone, CardState, CardViewState, CardType } from 'models/card'
import { Phase, PhaseAction } from 'models/phase'
import { findCardState, findCardStateByLocalId } from 'utils/helpers/find'
import {
  canChargeMana,
  canSummon,
  canAttack,
  canBattle
} from 'utils/helpers/phase'

const createZoneSelector = (zone: Zone, mine: boolean) =>
  createSelector(
    (state: State) => state.cards,
    (cards): Array<CardViewState> =>
      cards
        .filter(cardState => cardState.mine === mine && cardState.zone === zone)
        .sort((a, b) => a.order - b.order)
        .map(cardState => {
          const card = cardCollection.find(cardState)

          return {
            localId: cardState.localId,
            zone: cardState.zone,
            name: card.name,
            selectable: false,
            tapped: cardState.tapped
          }
        })
  )

export const getMyDeck = createZoneSelector(Zone.Deck, true)
export const getMyHand = createZoneSelector(Zone.Hand, true)
export const getMyBattleZone = createZoneSelector(Zone.BattleZone, true)
export const getMyManaZone = createZoneSelector(Zone.ManaZone, true)
export const getMyShieldZone = createZoneSelector(Zone.ShieldZone, true)
export const getMyGraveyard = createZoneSelector(Zone.Graveyard, true)

export const getTheirDeck = createZoneSelector(Zone.Deck, false)
export const getTheirHand = createZoneSelector(Zone.Hand, false)
export const getTheirBattleZone = createZoneSelector(Zone.BattleZone, false)
export const getTheirManaZone = createZoneSelector(Zone.ManaZone, false)
export const getTheirShieldZone = createZoneSelector(Zone.ShieldZone, false)
export const getTheirGraveyard = createZoneSelector(Zone.Graveyard, false)

export const getSelectedCard = createSelector(
  (state: State) => state.cards,
  (state: State) => state.game.selectedCardLocalId,
  (state: State) => state.game.phase,
  (state: State) => state.game.phaseAction,
  (cards, selectedCardLocalId, phase, phaseAction) => {
    if (selectedCardLocalId) {
      const cardState = findCardStateByLocalId(cards, selectedCardLocalId)
      const card = cardCollection.find(cardState)

      let actionName = ''
      let availableActions = [
        canChargeMana(cardState, phase, phaseAction),
        canSummon(cardState, phase, phaseAction),
        canAttack(cardState, phase, phaseAction),
        canBattle(cardState, phase, phaseAction)
      ]

      console.log(availableActions)

      switch (phase) {
        case Phase.Mana:
          actionName = 'Charge Mana'
          break
        case Phase.Summon:
          actionName = card.type === CardType.Spell ? 'Cast' : 'Summon'
          break
        case Phase.Battle:
          actionName = 'Attack'
          break
      }

      return {
        name: card.name,
        actionName,
        actionAvailable: availableActions.some(Boolean)
      }
    }
  }
)

export const canCancel = createSelector(
  (state: State) => state.game.phaseAction,
  phaseAction => phaseAction !== PhaseAction.None
)
