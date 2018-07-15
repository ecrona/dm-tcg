import { Creature, Civilization } from '@shared/models/card'
import { Race } from '@shared/models/race'

export class HanusaRadianceElemental extends Creature {
  public id = 'dm-01-s1'
  public name = 'Hanusa, Radiance Elemental'
  public civilization = Civilization.Light
  public manaCost = 7
  public race = Race.AngelCommand
  public power = 9500
  public shieldBreakAmount = 2
}
