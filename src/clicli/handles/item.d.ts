declare interface item extends LuaUserdata {
  __item: never;
  api_drop_self: (this: void, position: position, stacks?: number) => void;
}
