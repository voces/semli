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

    super(globalapi.coord_to_point(x as any, y as any, z as any));
  }

  distance(position: Position) {
    return gameapi.get_points_dis(this.handle, position.handle).float();
  }
}
