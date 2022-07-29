import { Position } from "../lib/Position";
import { newAbilityTrigger, newGlobalTrigger } from "../lib/Trigger";
import type { Unit } from "../lib/Unit";

const wanderers: { unit: Unit; position: Position }[] = [];
let offset = 0;

newAbilityTrigger(134254668, EVENT.ABILITY_OBTAIN, (ability) => {
  const unit = ability.unit();
  const pos = unit.position();
  wanderers.push({ unit, position: pos });
});

const t = newGlobalTrigger(EVENT.REPEAT_TIMEOUT, () => {
  for (let i = wanderers.length - 1 - offset; i >= 0; i -= 7) {
    const { unit, position } = wanderers[i];
    if (unit.exists() && unit.isAlive() && unit.hasAbility(134254668)) {
      if (!unit.isMoving() && !unit.isBattling()) {
        unit.walkTo(
          new Position(
            position.x() + (Math.random() - 0.5) * 1024,
            position.y() + (Math.random() - 0.5) * 1024,
            position.z(),
          ),
        );
      }
    } else {
      wanderers.splice(i, 1);
    }
  }
  offset = offset === 6 ? 0 : offset + 1;
});
t.event.delay = () => Fix32(0.5);
