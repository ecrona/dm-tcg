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
        <br />
        <div>
          Them
          <div className="deck">
            Deck cards: {this.props.theirCards.deck.length}
          </div>
          <div className="deck">
            Graveyard cards: {this.props.theirCards.graveyard.length}
          </div>
          <div className="hand">
            Hand:{' '}
            {this.props.theirCards.hand.map(card => <span>{card.name}, </span>)}
          </div>
          <div className="mana-zone">
            Mana Zone:{' '}
            {this.props.theirCards.manaZone.map(card => (
              <span>{card.name}, </span>
            ))}
          </div>
          <div className="shield-zone">
            Shield Zone:{' '}
            {this.props.theirCards.shieldZone.map(card => (
              <span>{card.name}, </span>
            ))}
          </div>
          <div className="battle-zone">
            Battle Zone:{' '}
            {this.props.theirCards.battleZone.map(card => (
              <span>{card.name}, </span>
            ))}
          </div>
        </div>
        <br />
        <div>
          Me
          <div className="battle-zone">
            Battle Zone:{' '}
            {this.props.myCards.battleZone.map(card => (
              <span>{card.name}, </span>
            ))}
          </div>
          <div className="shield-zone">
            Shields:{' '}
            {this.props.myCards.shieldZone.map(card => (
              <span>{card.name}, </span>
            ))}
          </div>
          <div className="mana-zone">
            Mana Zone:{' '}
            {this.props.myCards.manaZone.map(card => (
              <span>{card.name}, </span>
            ))}
          </div>
          <div className="hand">
            Hand:{' '}
            {this.props.myCards.hand.map(card => <span>{card.name}, </span>)}
          </div>
          <div className="deck">
            Graveyard cards: {this.props.myCards.graveyard.length}
          </div>
          <div className="deck">
            Deck cards: {this.props.myCards.deck.length}
          </div>
        </div>
      </div>
    )
  }
}
