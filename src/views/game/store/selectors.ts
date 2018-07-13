import { createSelector } from 'reselect'
import { State } from 'store/reducers'
import { Zone, CardState } from 'models/card'
import { cardCollection } from 'collections/card'

const createZoneSelector = (zone: Zone, mine: boolean) =>
  createSelector(
    (state: State) => state.cards,
    cards =>
      cards
        .filter(card => card.mine === mine && card.zone === zone)
        .map(card => cardCollection.find(card))
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
