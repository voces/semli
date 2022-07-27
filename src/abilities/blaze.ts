import { Rectangle } from "../lib/Rectangle";
import { SpecialEffect } from "../lib/SpecialEffect";
import { Timer } from "../lib/Timer";
import { newAbilityTrigger, newModifierTrigger } from "../lib/Trigger";

newAbilityTrigger(134242969, EVENT.ABILITY_PS_START, (ability) => {
  new SpecialEffect(102135, ability.unit(), {
    attachPoint: "hand1",
    scale: 0.05,
    duration: 2,
  });
  new SpecialEffect(102135, ability.unit(), {
    attachPoint: "hand2",
    scale: 0.05,
    duration: 2,
  });
  ability.unit().playAnimation("attack1");
});

newAbilityTrigger(134242969, EVENT.ABILITY_SP_END, (ability) => {
  ability.unit().addModifier(134224953, {
    duration: 30,
    affiliatedAbility: ability,
    period: 0.1,
  });
});

newModifierTrigger(134224953, EVENT.OBTAIN_MODIFIER, (modifier) => {
  modifier.receiver().adjustMovementSpeed(modifier.ability()!.level() * 250);
});

newModifierTrigger(134224953, EVENT.LOSS_MODIFIER, (modifier) => {
  modifier.receiver().adjustMovementSpeed(modifier.ability()!.level() * -250);
});

newModifierTrigger(
  134224953,
  EVENT.MODIFIER_CYCLE_TRIGGER,
  (modifier) => {
    new SpecialEffect(101770, modifier.receiver().position(), {
      duration: 10,
      scale: 0.08,
      orientation: Math.random() * 360,
    });

    const rect = new Rectangle(modifier.receiver().position(), 256, 256);

    // TODO: when handles have equality, we can store counts in a map and not spam numbers...
    new Timer(0.5, () => {
      rect.units().forEach((u) => {
        if (u.isEnemy(modifier.receiver())) {
          modifier.receiver().damageTarget(u, 1, 2);
        }
      });
    }, 20);
  },
);
