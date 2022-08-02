import { Position } from "../lib/Position";
import { newGlobalTrigger } from "../lib/Trigger";
import { Unit } from "../lib/Unit";

newGlobalTrigger(EVENT.UNIT_DIE, (_, data) => {
  const dyingUnit = Unit.fromHandle(data.__target_unit!);
  const killingUnit = Unit.fromHandle(data.__source_unit!);

  // Revive heroes instantly for now
  if (dyingUnit.isHero()) dyingUnit.revive(new Position(224, -768));

  if (killingUnit.isHero()) {
    killingUnit.addXp(32 * (9 / 8) ** (dyingUnit.level() - 1));
  }
});
