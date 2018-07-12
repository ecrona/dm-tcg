import { createSelector } from 'reselect'
import { State } from 'store/reducers'

export const hasSelectedFixtureStarted = createSelector(
  (state: State) => state.game.phase,
  phase => phase
)
