export const UI_EVENT_UNSET = -1;
export const UI_EVENT_CLICK = 1;
export const UI_EVENT_DOUBLE_CLICK = 22;
export const UI_EVENT_PRESS = 3;
export const UI_EVENT_ENTER = 24;
export const UI_EVENT_HOVER = 23;
export const UI_EVENT_RETURN_TO_LOBBY = 11;
export const UI_EVENT_GAME_RESUME = 18;
export const UI_EVENT_EXIT = 25;
export const UI_EVENT_RIGHT_CLICK = 26;
export type UI_EVENT =
  | typeof UI_EVENT_UNSET
  | typeof UI_EVENT_CLICK
  | typeof UI_EVENT_DOUBLE_CLICK
  | typeof UI_EVENT_PRESS
  | typeof UI_EVENT_ENTER
  | typeof UI_EVENT_HOVER
  | typeof UI_EVENT_RETURN_TO_LOBBY
  | typeof UI_EVENT_GAME_RESUME
  | typeof UI_EVENT_EXIT
  | typeof UI_EVENT_RIGHT_CLICK;

export const UI_ANIM_UNIFORM = 0;
export const UI_ANIM_EASE_IN = 12;
export const UI_ANIM_EASE_OUT = 22;
export const UI_ANIM_EASE_IN_OUT = 32;
export type UI_ANIM =
  | typeof UI_ANIM_UNIFORM
  | typeof UI_ANIM_EASE_IN
  | typeof UI_ANIM_EASE_OUT
  | typeof UI_ANIM_EASE_IN_OUT;

export const UI_ACTION_ANIMATE = 1;
export const UI_ACTION_SHOW = 2;
export const UI_ACTION_HIDE = 3;
export type UI_ACTION =
  | typeof UI_ACTION_ANIMATE
  | typeof UI_ACTION_SHOW
  | typeof UI_ACTION_HIDE;
