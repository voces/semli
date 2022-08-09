declare interface ability extends LuaUserdata {
  __ability: never;
  api_get_owner: (this: void) => unit;
  api_get_level: (this: void) => int;
  api_get_ability_id: (this: void) => int;
  api_get_str_attr: (this: void, attribute: string) => string;
}
