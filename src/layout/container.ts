import { connect } from 'react-redux'
import { State } from 'store'
import Component from './component'

const mapStateToProps = (state: State) => ({})

const mapDispatchToProps = (dispatch: any) => ({})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
