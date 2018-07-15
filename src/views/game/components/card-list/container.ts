import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../store/actions'
import Component from './component'

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectCard: actions.selectCard }, dispatch)

export type StoreProps = ReturnType<typeof mapDispatchToProps>

export default connect(
  undefined,
  mapDispatchToProps
)(Component)
