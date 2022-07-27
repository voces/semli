import { Group } from "../lib/Group";
import { SpecialEffect } from "../lib/SpecialEffect";
import { newAbilityTrigger } from "../lib/Trigger";

newAbilityTrigger(134271975, EVENT.ABILITY_PS_START, (ability) => {
  new SpecialEffect(102135, ability.unit(), {
    attachPoint: "hand1",
    scale: 0.07,
    duration: 1,
  });
  new SpecialEffect(102135, ability.unit(), {
    attachPoint: "hand2",
    scale: 0.07,
    duration: 1,
  });
  ability.unit().playAnimation("attack1");
  const a = ability.unit().angleTo(ability.owner().mousePosition());
  ability.unit().face(a, 125);
});

newAbilityTrigger(134271975, EVENT.ABILITY_SP_END, (ability) => {
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
          new SpecialEffect(101844, u, {
            attachPoint: "blood",
            scale: 0.7,
            proportionalScale: false,
          });
          ability.unit().isEnemy(u) && ability.unit().damageTarget(
            u,
            -2.5 + 2.6 * (ability.level() + 2) ** 1.47,
            2,
          );
        },
      );
    },
    terrainCollide: () => {
      new SpecialEffect(101844, p.position(), { scale: 0.7 });
      p.delete();
    },
  });
});
