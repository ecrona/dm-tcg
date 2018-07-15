import * as React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import green from '@material-ui/core/colors/green'
import { StoreProps } from './container'
import { Game } from 'views/game'

interface Props extends StoreProps {}

const theme = createMuiTheme({
  palette: {
    background: {
      default: green[500]
    }
  }
})

export default class Component extends React.PureComponent<Props> {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{}}>
          <span>DM TCG</span>
          <Game />
        </div>
      </MuiThemeProvider>
    )
  }
}
