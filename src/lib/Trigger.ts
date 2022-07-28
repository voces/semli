import { Ability } from "./Ability";
import { consumeId } from "./Handle";
import { Modifier } from "./Modifier";

export const newAbilityTrigger = (
  abilityId: number,
  event: ability_event,
  callback: (
    this: void,
    ability: Ability,
    trigger: trigger<ability>,
  ) => void,
): trigger<ability> => {
  const trigger = new_ability_trigger(
    abilityId,
    consumeId(),
    "",
    event,
    true,
  );

  trigger.on_event = (trigger, _, ability) =>
    callback(Ability.fromHandle(ability), trigger);

  return trigger;
};

export const newModifierTrigger = (
  modifierId: number,
  event: modifier_event,
  callback: (
    this: void,
    modifier: Modifier,
    trigger: trigger<modifier>,
    data: trigger_data,
  ) => void,
) => {
  const trigger = new_modifier_trigger(
    modifierId,
    consumeId(),
    "Period Ends",
    event,
    true,
  );

  trigger.on_event = (trigger, _1, modifier, data) =>
    callback(Modifier.fromHandle(modifier), trigger, data);
};

export const newGlobalTrigger = <Actor = unknown>(
  event: global_event | [global_event, string],
  callback: (
    this: void,
    actor: Actor,
    data: trigger_data,
    trigger: trigger<Actor>,
  ) => void,
) => {
  const trigger = new_global_trigger<Actor>(consumeId(), "", event, true);

  trigger.on_event = (trigger, _1, actor, data) =>
    callback(actor, data, trigger);

  return trigger;
};
