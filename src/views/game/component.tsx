import * as React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import green from '@material-ui/core/colors/green'
import { StoreProps } from './container'

interface Props extends StoreProps {}

export default class Component extends React.PureComponent<Props> {
  render() {
    return (
      <div>
        Me
        <div className="battle-zone">a</div>
        <div className="hand">b</div>
        <div className="mana-zone">c</div>
      </div>
    )
  }
}
