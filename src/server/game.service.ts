import { Component } from '@nestjs/common'

import { CardState, Zone, CardType } from '@shared/models/card'
import { LocalGame } from '@shared/models/game'
import { Phase, PhaseAction } from '@shared/models/phase'
import { Player } from '@shared/models/player'
import { cardCollection } from '@shared/collections/card'

interface Game {
  id: number
  players: Array<Player>
  phase: Phase
  phaseAction: PhaseAction
  turnPlayerId: number
  chargedManaAmount: number
}

const games = [
  {
    id: 1,
    players: [
      {
        id: 1,
        name: 'Eddie'
      },
      {
        id: 2,
        name: 'Orvar'
      }
    ],
    phase: Phase.Start,
    phaseAction: PhaseAction.None,
    turnPlayerId: 1,
    chargedManaAmount: 0
  }
]

@Component()
export class GameService {
  public readonly games: Array<Game> = games

  public getGame(playerId: number): Game {
    const game = this.games[0]

    return game
  }

  public getLocalGame(playerId: number): LocalGame {
    const game = this.getGame(playerId)

    return {
      me: game.players.find(player => player.id === playerId),
      them: game.players.find(player => player.id !== playerId),
      turnPlayerId: game.turnPlayerId,
      phase: game.phase,
      phaseAction: game.phaseAction,
      chargedManaAmount: game.chargedManaAmount
    }
  }

  public setNextPhase(playerId: number) {
    const game = this.getGame(playerId)

    switch (game.phase) {
      case Phase.Start:
        game.phase = Phase.Mana
        break
      case Phase.Mana:
        game.phase = Phase.Summon
        break
      case Phase.Summon:
        game.phase = Phase.Battle
        break
      case Phase.Battle:
        game.phase = Phase.Start
        game.turnPlayerId = game.players.find(
          player => player.id !== game.turnPlayerId
        ).id
        game.chargedManaAmount = 0
        break
    }
  }

  public incrementChargedManaAmount(playerId: number) {
    const game = this.getGame(playerId)
    game.chargedManaAmount++
  }
}
