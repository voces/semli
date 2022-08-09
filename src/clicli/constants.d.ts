declare type int = number;

type ABILITY_TYPE_HIDDEN = 0;
type ABILITY_TYPE_ATTACK = 1;
type ABILITY_TYPE_GENERAL = 2;
type ABILITY_TYPE_HERO = 3;
type ABILITY_TYPE =
  | ABILITY_TYPE_HIDDEN
  | ABILITY_TYPE_ATTACK
  | ABILITY_TYPE_GENERAL
  | ABILITY_TYPE_HERO;

type BAG_SLOT_TYPE_INVENTORY = 0;
type BAG_SLOT_TYPE_BAG = 1;
type BAG_SLOT_TYPE = BAG_SLOT_TYPE_INVENTORY | BAG_SLOT_TYPE_BAG;

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
  UNIT_REMOVE: global_event;
  UNIT_DIE: global_event;
};

type PLAYER_CONTROLLER_USER = 1;
type PLAYER_CONTROLLER_AI = 2;

type PLAYER_STATUS_PLAYING = 1;
type PLAYER_STATUS_DOES_NOT_EXIST = 2;
type PLAYER_STATUS_DISCONNECTED = 3;
type PLAYER_STATUS_LEFT = 4;

type damage_type = 1 | 2 | 3;

type visibility = 1 | 2 | 3 | 4;
