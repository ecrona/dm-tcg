import { Creature, Civilization } from 'models/card'
import { Race } from 'models/race'
import { EffectEvent } from 'models/effects'

export class AquaSniper extends Creature {
  public id = 'dm-01-s3'
  public name = 'Aqua Sniper'
  public civilization = Civilization.Water
  public manaCost = 8
  public race = Race.LiquidPeople
  public power = 5000

  /*public eventEffects = [
    {
      effect: new ReturnToHand(2),
      event: EffectEvent.Summoned,
      conditions: []
    }
  ]*/
}
