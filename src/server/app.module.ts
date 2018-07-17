import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { GameGateway } from './gateway/game.gateway'
import { CardService } from 'card.service'
import { GameService } from 'game.service'

@Module({
  imports: [],
  controllers: [AppController],
  components: [CardService, GameService, GameGateway]
})
export class AppModule {}
