declare interface shape extends LuaUserdata {
  __shape: never;
}

declare interface circle extends shape {
  __circle: never;
}

declare interface rectangle extends shape {
  __rectangle: never;
}
