declare interface player extends LuaUserdata {
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
