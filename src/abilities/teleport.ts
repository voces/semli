import { SpecialEffect } from "../lib/SpecialEffect";
import { newAbilityTrigger } from "../lib/Trigger";

newAbilityTrigger(134235163, EVENT.ABILITY_PS_START, (ability) => {
  new SpecialEffect(101613, ability.unit().position(), { height: 128 });
  ability.unit().playAnimation("attack1");
  const a = ability.unit().angleTo(ability.owner().mousePosition());
  ability.unit().face(a, 125);
});

newAbilityTrigger(134235163, EVENT.ABILITY_SP_END, (ability) => {
  new SpecialEffect(101613, ability.owner().mousePosition(), { height: 128 });
  const a = ability.unit().angleTo(ability.owner().mousePosition());
  ability.unit().face(a, 125);
  ability.unit().setPosition(ability.owner().mousePosition());
});
