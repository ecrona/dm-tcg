import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  WsException
} from '@nestjs/websockets'
import { map } from 'rxjs/operators'
import { GameService } from '../game.service'
import { CardService } from '../card.service'
import { actions as cardsActions } from '@shared/actions/cards'
import { actions as gameActions } from '@shared/actions/game'
import { moveCardToZone } from '@shared/utils/helpers/move'
import { Zone } from '@shared/models/card'
import { canChangePhase, canChargeMana } from '@shared/utils/helpers/phase'
import { UseGuards } from '@nestjs/common'
import { CanChangePhaseGuard } from 'guards/change-change-phase'

@WebSocketGateway()
export class GameGateway {
  constructor(
    private readonly GameService: GameService,
    private readonly CardService: CardService
  ) {}
  @WebSocketServer() server

  @SubscribeMessage('events')
  onEventf(client, data) {
    const event = 'events'
    const response = [1, 2, 3]

    return { event, data: response }
  }

  @SubscribeMessage('game/get-data')
  getData(client, data) {
    const playerId = Number(client.handshake.query.token)
    const game = this.GameService.getGame(playerId)

    return {
      event: 'event',
      data: gameActions.setData(
        this.GameService.getLocalGame(playerId),
        this.CardService.getMaskedCards(game.id, playerId)
      )
    }
  }

  @SubscribeMessage('game/next-phase')
  nextPhase(client, data) {
    const playerId = Number(client.handshake.query.token)
    const game = this.GameService.getGame(playerId)

    if (
      !canChangePhase(playerId, game.turnPlayerId, game.phase, game.phaseAction)
    ) {
      throw new WsException('Unauthorized')
    }

    this.GameService.setNextPhase(playerId)

    return {
      event: 'event',
      data: gameActions.changePhase(
        game.phase,
        game.turnPlayerId,
        game.chargedManaAmount
      )
    }
  }

  @SubscribeMessage('game/charge-mana')
  chargeMana(client, data) {
    const playerId = Number(client.handshake.query.token)
    const game = this.GameService.getGame(playerId)

    if (
      !canChargeMana(
        playerId,
        game.chargedManaAmount,
        data,
        game.phase,
        game.phaseAction
      )
    ) {
      throw new WsException('Unauthorized')
    }

    this.GameService.incrementChargedManaAmount(playerId)
    this.CardService.setCards(
      game.id,
      moveCardToZone(this.CardService.getCards(game.id), data, Zone.ManaZone)
    )

    return {
      event: 'event',
      data: cardsActions.chargeMana(data)
    }
  }
}
