import { ABILITY_TYPE, MODEL, MODIFIER_TYPE } from "../constants";
import { Group } from "../lib/Group";
import { SpecialEffect } from "../lib/SpecialEffect";
import { newAbilityTrigger, newModifierTrigger } from "../lib/Trigger";

newAbilityTrigger(
  ABILITY_TYPE.THUNDER_STORM,
  EVENT.ABILITY_PS_START,
  (ability) => {
    new SpecialEffect(MODEL.HAND_LIGHTNING, ability.unit(), {
      attachPoint: "hand1",
      scale: 0.01,
      duration: 1,
    });
    new SpecialEffect(MODEL.HAND_LIGHTNING, ability.unit(), {
      attachPoint: "hand2",
      scale: 0.01,
      duration: 1,
    });
    ability.unit().playAnimation("attack1");
  },
);

newAbilityTrigger(
  ABILITY_TYPE.THUNDER_STORM,
  EVENT.ABILITY_SP_END,
  (ability) => {
    ability.unit().addModifier(MODIFIER_TYPE.THUNDER_STORM, {
      duration: 30,
      affiliatedAbility: ability,
    });
  },
);

newModifierTrigger(
  MODIFIER_TYPE.THUNDER_STORM,
  EVENT.MODIFIER_CYCLE_TRIGGER,
  (modifier) => {
    const unit = Group.fromNearby(modifier.receiver().position(), 1000)
      .randomUnit();

    if (unit === undefined) return;
    if (
      unit.isAlly(modifier.receiver()) || unit === modifier.receiver()
    ) {
      return;
    }

    new SpecialEffect(MODEL.LIGHTNING_STRIKE, unit, {
      attachPoint: "blood",
      scale: 0.5,
      proportionalScale: false,
    });
    modifier.receiver().damageTarget(
      unit,
      40.5 + 10 * (modifier.ability()?.level() ?? 1) ** 1.15,
      2,
    );
  },
);
