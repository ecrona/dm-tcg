import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { GameGateway } from './gateway/game.gateway'
import { CardService } from 'card.service'

@Module({
  imports: [],
  controllers: [AppController],
  components: [CardService, GameGateway]
})
export class AppModule {}
