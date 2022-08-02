import { ABILITY_TYPE, MODEL } from "../constants";
import { Group } from "../lib/Group";
import { SpecialEffect } from "../lib/SpecialEffect";
import { newAbilityTrigger } from "../lib/Trigger";
import { set } from "./store";

const damageCalc = set(
  ABILITY_TYPE.FIREBALL,
  "damage",
  (ability) => -2.5 + 2.6 * (ability.level() + 2) ** 1.47,
);

newAbilityTrigger(ABILITY_TYPE.FIREBALL, EVENT.ABILITY_PS_START, (ability) => {
  new SpecialEffect(MODEL.HAND_FIRE, ability.unit(), {
    attachPoint: "hand1",
    scale: 0.07,
    duration: 1,
  });
  new SpecialEffect(MODEL.HAND_FIRE, ability.unit(), {
    attachPoint: "hand2",
    scale: 0.07,
    duration: 1,
  });
  ability.unit().playAnimation("attack1");
  const a = ability.unit().angleTo(ability.owner().mousePosition());
  ability.unit().face(a, 125);
});

newAbilityTrigger(ABILITY_TYPE.FIREBALL, EVENT.ABILITY_SP_END, (ability) => {
  const a = ability.unit().angleTo(ability.owner().mousePosition());
  ability.unit().face(a, 125);
  const p = ability.createProjectileOnSocket(a);
  // p.scale(0.5);
  p.createMover({
    maxDist: ability.kvFloat("distance"),
    initVelocity: ability.kvFloat("speed"),
    radius: ability.kvFloat("radius"),
    unitCollide: (unit) => {
      p.delete();
      Group.fromNearby(unit.position(), ability.kvFloat("splash")).forEach(
        (u) => {
          if (!ability.unit().isEnemy(u)) return;
          new SpecialEffect(MODEL.FIRE_EXPLOSION, u, {
            attachPoint: "blood",
            scale: 0.7,
            proportionalScale: false,
          });
          ability.unit().damageTarget(
            u,
            damageCalc(ability),
            2,
          );
        },
      );
    },
    terrainCollide: () => {
      new SpecialEffect(MODEL.FIRE_EXPLOSION, p.position(), { scale: 0.7 });
      p.delete();
    },
  });
});
