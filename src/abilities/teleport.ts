import { ABILITY_TYPE, MODEL } from "../constants";
import { SpecialEffect } from "../lib/SpecialEffect";
import { newAbilityTrigger } from "../lib/Trigger";

newAbilityTrigger(ABILITY_TYPE.TELEPORT, EVENT.ABILITY_PS_START, (ability) => {
  new SpecialEffect(MODEL.TRANSLOCATE, ability.unit().position(), {
    height: 128,
  });
  ability.unit().playAnimation("attack1");
  const a = ability.unit().angleTo(ability.owner().mousePosition());
  ability.unit().face(a, 125);
});

newAbilityTrigger(ABILITY_TYPE.TELEPORT, EVENT.ABILITY_SP_END, (ability) => {
  new SpecialEffect(MODEL.TRANSLOCATE, ability.owner().mousePosition(), {
    height: 128,
  });
  const a = ability.unit().angleTo(ability.owner().mousePosition());
  ability.unit().face(a, 125);
  ability.unit().setPosition(ability.owner().mousePosition());
});
