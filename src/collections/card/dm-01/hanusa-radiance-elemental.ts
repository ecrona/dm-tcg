import { Creature, Civilization } from 'models/card'
import { Race } from 'models/race'

export class HanusaRadianceElement extends Creature {
  public civilization = Civilization.Light
  public manaCost = 7
  public race = Race.AngelCommand
  public power = 9500
  public shieldBreakAmount = 2
}
