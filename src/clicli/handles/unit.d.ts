declare interface unit extends LuaUserdata {
  __unit: never;
  api_shift_item: (
    this: void,
    item: item,
    slotType: BAG_SLOT_TYPE,
    slot: number,
  ) => void;
  api_add_item: (this: void, itemType: number) => void;
  api_revive: (this: void, position: position) => void;
  api_check_has_ability_type: (this: void, abilityType: number) => boolean;
  api_is_moving: (this: void) => boolean;
  api_is_in_battle_state: (this: void) => boolean;
  api_release_command: (this: void, command: command) => void;
  api_get_float_attr: (this: void, attribute: string) => Fix32;
  api_get_abilities_by_type: (
    this: void,
    type: ABILITY_TYPE,
  ) => ability[];
  api_get_position: (this: void) => position;
  api_get_role: (this: void) => player;
  api_get_name: (this: void) => string;
  api_play_animation: (
    this: void,
    animation: string,
    rate: Fix32,
    start: Fix32,
    end: Fix32,
    loop: boolean,
    returnToIdle: boolean,
  ) => void;
  api_set_face_angle: (this: void, angle: angle, duration: number) => void;
  api_transmit: (this: void, position: position) => void;
  api_force_transmit: (this: void, position: position) => void;
  api_add_modifier: (
    this: void,
    modifierId: number,
    source: unit | undefined,
    ability: ability | undefined,
    duration: Fix32,
    period: Fix32,
    stacks: number,
  ) => void;
  /** Returns type. */
  api_get_key: (this: void) => number;
  api_get_id: (this: void) => number;
  is_hero: boolean;
  get_icon: () => string;
  api_set_attr_by_attr_element: (
    this: void,
    attribute: "ori_speed",
    amount: Fix32,
    mode: "ATTR_BASE" | "ATTR_BONUS",
  ) => void;
  api_add_attr_by_attr_element: (
    this: void,
    attribute: "ori_speed",
    amount: Fix32,
    mode: "ATTR_BASE" | "ATTR_BONUS",
  ) => void;
}
