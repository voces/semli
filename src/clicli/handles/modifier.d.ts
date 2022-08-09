declare interface modifier extends LuaUserdata {
  __modifier: never;
  api_get_owner: (this: void) => unit;
}
