import { connect } from 'react-redux'
import { State } from 'store/reducers'
import Component from './component'
import { bindActionCreators } from 'redux'
import { actions } from './store/actions'

const mapStateToProps = (state: State) => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ test: actions.test }, dispatch)

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
