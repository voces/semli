import { Group } from "../lib/Group";
import { SpecialEffect } from "../lib/SpecialEffect";
import { newAbilityTrigger, newModifierTrigger } from "../lib/Trigger";

newAbilityTrigger(134248699, EVENT.ABILITY_PS_START, (ability) => {
  new SpecialEffect(101587, ability.unit(), {
    attachPoint: "hand1",
    scale: 0.01,
    duration: 1,
  });
  new SpecialEffect(101587, ability.unit(), {
    attachPoint: "hand2",
    scale: 0.01,
    duration: 1,
  });
  ability.unit().playAnimation("attack1");
});

newAbilityTrigger(134248699, EVENT.ABILITY_SP_END, (ability) => {
  ability.unit().addModifier(134246117, {
    duration: 30,
    affiliatedAbility: ability,
  });
});

newModifierTrigger(134246117, EVENT.MODIFIER_CYCLE_TRIGGER, (modifier) => {
  const unit = Group.fromNearby(modifier.receiver().position(), 1000)
    .randomUnit();

  if (unit === undefined) return;
  if (unit.isAlly(modifier.receiver()) || unit === modifier.receiver()) return;

  new SpecialEffect(101602, unit, {
    attachPoint: "blood",
    scale: 0.5,
    proportionalScale: false,
  });
  modifier.receiver().damageTarget(
    unit,
    40.5 + 10 * (modifier.ability()?.level() ?? 1) ** 1.15,
    2,
  );
});
