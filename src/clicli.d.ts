declare type int = number;

declare interface handle {
  __handle: never;
}

type ABILITY_TYPE_HIDDEN = 0;
type ABILITY_TYPE_ATTACK = 1;
type ABILITY_TYPE_GENERAL = 2;
type ABILITY_TYPE_HERO = 3;
type ABILITY_TYPE =
  | ABILITY_TYPE_HIDDEN
  | ABILITY_TYPE_ATTACK
  | ABILITY_TYPE_GENERAL
  | ABILITY_TYPE_HERO;

declare interface unit extends handle {
  __unit: never;
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

declare interface command extends handle {
  __command: never;
}

declare interface ability extends handle {
  __ability: never;
  api_get_owner: (this: void) => unit;
  api_get_level: (this: void) => int;
}

declare interface modifier extends handle {
  __modifier: never;
  api_get_owner: (this: void) => unit;
}

declare interface trigger_data {
  __cur_ability?: ability;
  __cur_modifier?: modifier;
  __modifier?: modifier;
  __unit_id?: number;
  __pointing_world_pos?: position;
  __role_id?: number;
  __comp_name?: string;
}

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

declare interface ability_event {
  __abilityEvent: never;
}

declare interface modifier_event {
  __modifierEvent: never;
}

declare interface global_event {
  __globalEvent: never;
}

declare const EVENT: {
  /** Ability CD Ends */
  ABILITY_CD_END: ability_event;
  /** Ability Casting Starts */
  ABILITY_CS_START: ability_event;
  /** Ability Continuous Casting */
  ABILITY_CST_END: ability_event;
  /** Ability Continuous Casting */
  ABILITY_CST_INTERRUPT: ability_event;
  /** Ability Ends */
  ABILITY_END: ability_event;
  /** Ability Precast Ends */
  ABILITY_PS_END: ability_event;
  /** Ability Precast Interrupted */
  ABILITY_PS_INTERRUPT: ability_event;
  /** Ability Precast Starts */
  ABILITY_PS_START: ability_event;
  /** Ability Preparation Ends */
  ABILITY_SP_END: ability_event;
  /** Ability Preparation Interrupted */
  ABILITY_SP_INTERRUPT: ability_event;
  LOSS_MODIFIER: modifier_event;
  MODIFIER_BE_COVERED: modifier_event;
  MODIFIER_CYCLE_TRIGGER: modifier_event;
  MODIFIER_GET_BEFORE_CREATE: modifier_event;
  MODIFIER_LAYER_CHANGE: modifier_event;
  OBTAIN_MODIFIER: modifier_event;
  GAME_INIT: global_event;
  UNIT_BORN: global_event;
  SELECT_UNIT: global_event;
  SELECT_UNIT_GROUP: global_event;
  MOUSE_MOVE_EVENT: global_event;
  MOUSE_KEY_DOWN_EVENT: global_event;
  MOUSE_KEY_UP_EVENT: global_event;
  TIMEOUT: global_event;
  REPEAT_TIMEOUT: global_event;
  TRIGGER_COMPONENT_EVENT: global_event;
  ABILITY_OBTAIN: ability_event;
  ABILITY_LOSE: ability_event;
};

declare interface position extends handle {
  __position: never;
}

declare interface angle {
  __angle: never;
}

declare interface group extends handle, Array<number> {
  __group: never;
}

declare interface special_effect extends handle {
  __special_effect: never;
}

type PLAYER_CONTROLLER_USER = 1;
type PLAYER_CONTROLLER_AI = 2;

type PLAYER_STATUS_PLAYING = 1;
type PLAYER_STATUS_DOES_NOT_EXIST = 2;
type PLAYER_STATUS_DISCONNECTED = 3;
type PLAYER_STATUS_LEFT = 4;

declare interface player extends handle {
  __player: never;
  role_select_unit: (this: void, unit: unit) => void;
  set_role_mouse_move_select: (this: void, enabled: boolean) => void;
  set_role_mouse_left_click: (this: void, enabled: boolean) => void;
  get_role_id_num: (this: void) => number;
  get_role_type: (this: void) => PLAYER_CONTROLLER_USER | PLAYER_CONTROLLER_AI;
  get_role_status: (
    this: void,
  ) =>
    | PLAYER_STATUS_PLAYING
    | PLAYER_STATUS_DOES_NOT_EXIST
    | PLAYER_STATUS_DISCONNECTED
    | PLAYER_STATUS_LEFT;
}

declare interface pydict {
  __pydict: pydict;
  (this: void): pydict;
  [key: string]: any;
}

declare const pydict: pydict;

declare interface Fix32 {
  __fix32: never;
  (this: void, value: number): Fix32;
  float: () => number;
}
declare const Fix32: Fix32;

declare interface Int32 {
  __int32: never;
  (this: void, value: number): Int32;
}
declare const Int32: Int32;

declare interface projectile extends handle {
  __projectile: never;
  create_mover_trigger: (
    this: void,
    args: pydict,
    type: "StraightMover",
    unitCollide: (this: void) => void,
    moverFinish: (this: void) => void,
    terrainCollide: (this: void) => void,
    moverInterrupt: (this: void) => void,
    moverRemoved: (this: void) => void,
  ) => void;
  api_delete: (this: void, unknown: null) => void;
  api_set_scale: (this: void, x: Fix32, y: Fix32, z: Fix32) => void;
  api_get_face_angle: (this: void) => angle;
  api_get_position: (this: void) => position;
}

declare interface shape extends handle {
  __shape: never;
}

declare interface circle extends shape {
  __circle: never;
}

declare interface rectangle extends shape {
  __rectangle: never;
}

declare interface timer_id {
  __timer_id: never;
}

declare interface timer {
  __timer: never;
  t_id: timer_id;
}

type damage_type = 1 | 2 | 3;

type visibility = 1 | 2 | 3 | 4;

declare const gameapi: {
  unit_is_exist: (this: void, unit: unit) => boolean;
  create_unit_command_move_to_pos: (this: void, position: position) => command;
  create_unit_command_attack_move: (this: void, position: position) => command;
  get_visibility_of_unit: (
    this: void,
    visibleTo: player | unit,
    unit: unit,
  ) => boolean;
  set_btn_short_cut: (
    this: void,
    player: player,
    button: string,
    key: number,
  ) => void;
  create_unit: (
    this: void,
    type: number,
    position: position,
    orientation: Fix32,
    player: player,
  ) => unit;
  set_progress_bar_max_value: (
    this: void,
    player: player,
    framename: string,
    value: number,
  ) => void;
  set_progress_bar_current_value: (
    this: void,
    player: player,
    framename: string,
    value: number,
  ) => void;
  set_ui_comp_text: (
    this: void,
    player: player,
    framename: string,
    text: string,
  ) => void;
  get_points_dis: (this: void, a: position, b: position) => Fix32;
  hide_ui_comp_animation: (
    this: void,
    player: player,
    framename: string,
    animation: string,
  ) => void;
  show_ui_comp_animation: (
    this: void,
    player: player,
    framename: string,
    animation: string,
  ) => void;
  set_skill_on_ui_comp: (
    this: void,
    player: player,
    ability: ability,
    framename: string,
  ) => void;
  get_icon_id_by_unit_type: (this: void, unitType: number) => string;
  set_ui_comp_image: (
    this: void,
    player: player,
    framename: string,
    imagePath: string,
  ) => void;
  get_points_angle: (this: void, from: position, to: position) => angle;
  get_player_pointing_pos: (this: void, player: player) => position;
  create_projectile_on_socket: (
    this: void,
    projectile: unknown,
    socketUnit: unit,
    socket: string,
    angle: angle,
    affiliatedUnit: unit,
    affiliatedAbility: ability,
    visibility: visibility,
  ) => projectile;
  get_kv_pair_value_projectile: (
    this: void,
    ability: ability,
    key: string,
  ) => projectile;
  get_kv_pair_value_float: (
    this: void,
    ability: ability,
    key: string,
  ) => number;
  apply_damage: (
    this: void,
    source: unit,
    unknown1: null,
    target: unit,
    damageType: damage_type,
    damage: Fix32,
    unknown2: boolean,
  ) => void;
  get_mover_collide_unit: (this: void) => unit;
  get_role_by_role_id: (this: void, id: number) => player | undefined;
  get_unit_by_id: (this: void, id: number) => unit;
  camera_set_follow_unit: (this: void, player: player, unit: unit) => void;
  print_to_dialog: (this: void, level: 1 | 2 | 3, message: string) => void;
  filter_unit_id_list_in_area: (
    this: void,
    position: position,
    shape: shape,
  ) => group;
  refresh_unit_group: (this: void, group: group) => group;
  show_msg_to_role: (
    this: void,
    player: player,
    string: string,
    localized: boolean,
  ) => void;
  is_ally: (this: void, unitA: unit, unitB: unit) => boolean;
  is_enemy: (this: void, unitA: unit, unitB: unit) => boolean;
  create_sfx_on_point: (
    this: void,
    effectId: number,
    position: position,
    orientation: angle | Fix32,
    scale: Fix32,
    height: Fix32,
    duration: Fix32,
  ) => special_effect;
  create_sfx_on_unit: (
    this: void,
    effectId: number,
    unit: unit,
    attachPoint: string,
    rotate: boolean,
    proportionalScale: boolean,
    scale: Fix32,
    duration: Fix32,
  ) => special_effect;
  get_random_unit_in_unit_group: (this: void, group: group) => unit | undefined;
  remove_unit_in_group: (this: void, group: group, unit: unit) => void;
  create_rect_area_by_center: (
    this: void,
    center: position,
    width: Fix32,
    height: Fix32,
  ) => rectangle;
  get_unit_group_in_area: (this: void, shape: shape) => group;
  set_trigger_variable_modifier_entity: (
    this: void,
    name: string,
    value: modifier,
  ) => void;
  get_trigger_variable_modifier_entity: (this: void, name: string) => modifier;
  add_timer: (
    this: void,
    timeout: Fix32,
    unknownMaybePeriodic: boolean,
    callback: (this: void) => void,
  ) => timer;
  cancel_timer: (this: void, id: timer_id) => void;
  get_role_by_int: (this: void, index: number) => player | undefined;
};

declare const globalapi: {
  get_fixed_coord_index: (
    this: void,
    position: position,
    index: number,
  ) => Fix32;
  fixed_arithmetic_operation: (
    this: void,
    left: int | Fix32,
    operator: "+" | "*",
    right: int | Fix32,
  ) => Fix32;
  sqrt: (this: void, value: Fix32 | int) => number;
  fixed_to_str: (this: void, value: Fix32) => string;
  coord_to_point: (
    this: void,
    x: Fix32 | number,
    y: Fix32 | number,
    unknown: Fix32 | number,
  ) => position;
  create_circular_shape: (this: void, radius: Fix32) => circle;
  get_related_ability: (this: void, modifier: modifier) => ability | undefined;
  is_unit_alive: (this: void, unit: unit) => boolean;
  fixed_to_int32: (this: void, value: Fix32) => Int32;
};

declare const python: {
  enumerate: <T>(
    this: void,
    array: T[],
  ) => LuaIterable<LuaMultiReturn<[number, T]>>;
};

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
