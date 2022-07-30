import { ABILITY_TYPE, MODEL } from "../constants";
import { SpecialEffect } from "../lib/SpecialEffect";
import { newAbilityTrigger } from "../lib/Trigger";

newAbilityTrigger(ABILITY_TYPE.FIREBOLT, EVENT.ABILITY_PS_START, (ability) => {
  new SpecialEffect(MODEL.HAND_FIRE, ability.unit(), {
    attachPoint: "hand1",
    scale: 0.05,
    duration: 1,
  });
  new SpecialEffect(MODEL.HAND_FIRE, ability.unit(), {
    attachPoint: "hand2",
    scale: 0.05,
    duration: 1,
  });
  ability.unit().playAnimation("attack1");
  const a = ability.unit().angleTo(ability.owner().mousePosition());
  ability.unit().face(a, 125);
});

newAbilityTrigger(ABILITY_TYPE.FIREBOLT, EVENT.ABILITY_SP_END, (ability) => {
  const a = ability.unit().angleTo(ability.owner().mousePosition());
  ability.unit().face(a, 125);
  const p = ability.createProjectileOnSocket(a);
  p.createMover({
    maxDist: ability.kvFloat("distance"),
    initVelocity: ability.kvFloat("speed"),
    radius: ability.kvFloat("radius"),
    unitCollide: (unit) => {
      p.delete();
      new SpecialEffect(MODEL.FIRE_EXPLOSION, unit, {
        attachPoint: "blood",
        scale: 0.5,
        proportionalScale: false,
      });
      ability.unit().damageTarget(
        unit,
        4.5 + 0.6 * ability.level() ** 1.5,
        2,
      );
    },
    terrainCollide: () => {
      new SpecialEffect(MODEL.FIRE_EXPLOSION, p.position(), { scale: 0.5 });
      p.delete();
    },
  });
});
