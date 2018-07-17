import * as React from 'react'
import { StoreProps } from './container'
import { CardList } from './components/card-list'
import { Phase, PhaseAction } from '@shared/models/phase'

interface Props extends StoreProps {}

export default class Component extends React.PureComponent<Props> {
  public componentDidMount() {
    this.props.connect()
  }

  public getPhaseDescription() {
    switch (this.props.phase) {
      case Phase.Mana:
        return 'Mana Phase'
      case Phase.Summon:
        return 'Summon Phase'
      case Phase.Battle:
        return 'Battle Phase'
      default:
        return 'Start Phase'
    }
  }

  public getPhaseActionDescription() {
    switch (this.props.phaseAction) {
      case PhaseAction.Attack:
        return 'Choose target to attack'
      default:
        return ''
    }
  }

  render() {
    const { myCards, theirCards, selectedCard } = this.props

    return (
      <div>
        <br />
        <div>
          Them
          <div className="deck">Deck cards: {theirCards.deck.length}</div>
          <div className="deck">
            Graveyard cards: {theirCards.graveyard.length}
          </div>
          <div className="hand">
            Hand: <CardList cards={theirCards.hand} />
          </div>
          <div className="mana-zone">
            Mana Zone: <CardList cards={theirCards.manaZone} />
          </div>
          <div className="shield-zone">
            Shield Zone: <CardList cards={theirCards.shieldZone} />
          </div>
          <div className="battle-zone">
            Battle Zone: <CardList cards={theirCards.battleZone} />
          </div>
        </div>
        <br />
        <div>
          Me
          <div className="battle-zone">
            Battle Zone: <CardList cards={myCards.battleZone} />
          </div>
          <div className="shield-zone">
            Shields: <CardList cards={myCards.shieldZone} />
          </div>
          <div className="mana-zone">
            Mana Zone: <CardList cards={myCards.manaZone} />
          </div>
          <div className="hand">
            Hand: <CardList cards={myCards.hand} />
          </div>
          <div className="deck">
            Graveyard cards: {myCards.graveyard.length}
          </div>
          <div className="deck">Deck cards: {myCards.deck.length}</div>
        </div>
        <br />
        {this.props.selectedCard && (
          <div>
            <div>Selected Card:{selectedCard.name}</div>
            <button
              onClick={() => this.props.runCardAction()}
              disabled={!selectedCard.actionAvailable}
            >
              {selectedCard.actionName}
            </button>
          </div>
        )}
        <br />
        <div>
          {this.getPhaseDescription()}
          {!!this.props.phaseAction && this.getPhaseActionDescription()}
          <div>
            <button
              onClick={this.props.nextPhase}
              disabled={!this.props.canChangePhase}
            >
              Next phase
            </button>
            <button
              onClick={this.props.cancel}
              disabled={!this.props.canCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }
}
