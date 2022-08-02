import { ABILITY_TYPE, MODEL, MODIFIER_TYPE } from "../constants";
import { Rectangle } from "../lib/Rectangle";
import { SpecialEffect } from "../lib/SpecialEffect";
import { Timer } from "../lib/Timer";
import { newAbilityTrigger, newModifierTrigger } from "../lib/Trigger";
import { set } from "./store";

const damageCalc = set(
  ABILITY_TYPE.BLAZE,
  "damage",
  (ability) => (ability.level() + 2) ** 1.25 / 1.97,
);

newAbilityTrigger(ABILITY_TYPE.BLAZE, EVENT.ABILITY_PS_START, (ability) => {
  new SpecialEffect(MODEL.HAND_FIRE, ability.unit(), {
    attachPoint: "hand1",
    scale: 0.05,
    duration: 2,
  });
  new SpecialEffect(MODEL.HAND_FIRE, ability.unit(), {
    attachPoint: "hand2",
    scale: 0.05,
    duration: 2,
  });
  ability.unit().playAnimation("attack1");
});

newAbilityTrigger(ABILITY_TYPE.BLAZE, EVENT.ABILITY_SP_END, (ability) => {
  ability.unit().addModifier(MODIFIER_TYPE.BLAZE, {
    duration: 30,
    affiliatedAbility: ability,
    period: 0.1,
  });
});

newModifierTrigger(MODIFIER_TYPE.BLAZE, EVENT.OBTAIN_MODIFIER, (modifier) => {
  modifier.receiver().adjustMovementSpeed(modifier.ability()!.level() * 250);
});

newModifierTrigger(MODIFIER_TYPE.BLAZE, EVENT.LOSS_MODIFIER, (modifier) => {
  modifier.receiver().adjustMovementSpeed(modifier.ability()!.level() * -250);
});

newModifierTrigger(
  MODIFIER_TYPE.BLAZE,
  EVENT.MODIFIER_CYCLE_TRIGGER,
  (modifier) => {
    const ability = modifier.ability();
    new SpecialEffect(MODEL.LIGHT_FIRE_PATCH, modifier.receiver().position(), {
      duration: 10,
      scale: 0.08,
      orientation: Math.random() * 360,
    });

    const rect = new Rectangle(modifier.receiver().position(), 256, 256);

    // TODO: when handles have equality, we can store counts in a map and not spam numbers...
    new Timer(0.5, () => {
      rect.units().forEach((u) => {
        if (u.isEnemy(modifier.receiver())) {
          modifier.receiver().damageTarget(
            u,
            (ability ? damageCalc(ability) : 2) * 0.5,
            2,
          );
        }
      });
    }, 20);
  },
);
