import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer
} from '@nestjs/websockets'
import { map } from 'rxjs/operators'
import { CardService } from '../card.service'
import { ActionTypes, actions, Actions } from '@shared/actions/websocket'

console.log(actions)

@WebSocketGateway()
export class GameGateway {
  constructor(private readonly CardService: CardService) {}
  @WebSocketServer() server

  @SubscribeMessage('events')
  onEventf(client, data) {
    const event = 'events'
    const response = [1, 2, 3]

    return { event, data: response }
  }

  @SubscribeMessage('game/get-data')
  getData(client, data) {
    return {
      event: 'event',
      data: { type: '[Game] Set data', payload: this.CardService.cards }
    }
  }

  @SubscribeMessage('game/next-phase')
  nextPhase(client, data): any {
    return { event, data }
  }
}
