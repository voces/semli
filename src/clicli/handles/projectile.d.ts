declare interface projectile extends LuaUserdata {
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
