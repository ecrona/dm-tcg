import * as React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import green from '@material-ui/core/colors/green'
import { CardViewState } from '@shared/models/card'
import { StoreProps } from './container'

interface Props extends StoreProps {
  cards: Array<CardViewState>
}

export default class Component extends React.PureComponent<Props> {
  render() {
    return this.props.cards.map((card, index) => (
      <span
        key={index}
        style={{ textDecoration: card.tapped ? 'underline' : '' }}
        onClick={() => this.props.selectCard(card.localId)}
      >
        {card.name},{' '}
      </span>
    ))
  }
}
