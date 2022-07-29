import { Handle } from "./Handle";

export class Position extends Handle<position> {
  static fromHandle(handle: position) {
    return this._fromHandle(handle) as Position;
  }

  constructor(x = 0, y = 0, z = 0) {
    if (Handle.initFromHandle()) {
      super();
      return;
    }

    super(globalapi.coord_to_point(Fix32(x), Fix32(y), Fix32(z)));
  }

  distance(position: Position) {
    return gameapi.get_points_dis(this.handle, position.handle).float();
  }

  x() {
    return globalapi.get_fixed_coord_index(this.handle, 0).float();
  }

  y() {
    return globalapi.get_fixed_coord_index(this.handle, 2).float();
  }

  z() {
    return globalapi.get_fixed_coord_index(this.handle, 1).float();
  }
}
