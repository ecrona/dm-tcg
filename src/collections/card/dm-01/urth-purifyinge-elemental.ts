import { Creature, Civilization } from 'models/card'
import { Race } from 'models/race'
import { EffectEvent } from 'models/effects'

export class UrthPuriyingElemental extends Creature {
  public id = 'dm-01-s2'
  public name = 'Urth, Purifying Elemental'
  public civilization = Civilization.Light
  public manaCost = 6
  public race = Race.AngelCommand
  public power = 6000
  public shieldBreakAmount = 2

  /*public eventEffects = [
    {
      effect: new UntapEvent(),
      event: EffectEvent.EndTurn,
      conditions: []
    }
  ]*/
}
