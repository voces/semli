declare interface trigger<Actor = unknown> {
  __trigger: never;
  on_event?: (
    this: void,
    trigger: trigger,
    event_name: unknown,
    actor: Actor,
    data: trigger_data,
  ) => void;
  event: {
    delay: (this: void) => Fix32;
  };
}

declare function new_ability_trigger(
  this: void,
  ability: number,
  triggerId: number,
  triggerName: string,
  event: ability_event,
  enabled: boolean,
): trigger<ability>;

declare function new_global_trigger<Actor = unknown>(
  this: void,
  triggerId: number,
  triggerName: string,
  event: global_event | [global_event, string | number],
  enabled: boolean,
): trigger<Actor>;

declare function new_modifier_trigger(
  this: void,
  modifierId: number,
  triggerId: number,
  triggerName: string,
  event: modifier_event,
  enabled: boolean,
): trigger<modifier>;
