import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from 'store/reducers'
import { actions } from './store/actions'
import {
  getMyDeck,
  getMyHand,
  getMyBattleZone,
  getMyManaZone,
  getMyShieldZone,
  getMyGraveyard,
  getTheirDeck,
  getTheirHand,
  getTheirBattleZone,
  getTheirManaZone,
  getTheirShieldZone,
  getTheirGraveyard
} from './store/selectors'
import Component from './component'

const mapStateToProps = (state: State) => ({
  myCards: {
    deck: getMyDeck(state),
    hand: getMyHand(state),
    battleZone: getMyBattleZone(state),
    manaZone: getMyManaZone(state),
    shieldZone: getMyShieldZone(state),
    graveyard: getMyGraveyard(state)
  },
  theirCards: {
    deck: getTheirDeck(state),
    hand: getTheirHand(state),
    battleZone: getTheirBattleZone(state),
    manaZone: getTheirManaZone(state),
    shieldZone: getTheirShieldZone(state),
    graveyard: getTheirGraveyard(state)
  },
  phase: state.game.phase
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ test: actions.test }, dispatch)

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
