declare const gameapi: {
  create_item_by_id: (
    this: void,
    position: position,
    itemType: number,
    owner: player,
  ) => item;
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
  set_item_on_ui_comp: (
    this: void,
    player: player,
    item: item,
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
