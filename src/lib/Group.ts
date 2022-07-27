import { Handle } from "./Handle";
import { Position } from "./Position";
import { Unit } from "./Unit";

export class Group extends Handle<group> {
  constructor() {
    if (Handle.initFromHandle()) {
      super();
      return;
    }

    super([] as any as group);
  }

  static fromHandle(handle: group) {
    return this._fromHandle(handle) as Group;
  }

  static fromNearby(position: Position, range: number) {
    const shape = globalapi.create_circular_shape(Fix32(range));
    const filter = gameapi.filter_unit_id_list_in_area(position.handle, shape);

    return Group.fromHandle(gameapi.refresh_unit_group(filter));
  }

  forEach(callback: (this: void, unit: Unit) => void) {
    for (const [, unit] of python.enumerate(this.handle)) {
      callback(Unit.fromHandle(gameapi.get_unit_by_id(unit)));
    }
  }

  /** Filters out units in-place. */
  filter(callback: (this: void, unit: Unit) => boolean) {
    for (const [, unitIdx] of python.enumerate(this.handle)) {
      const unitHandle = gameapi.get_unit_by_id(unitIdx);
      if (!callback(Unit.fromHandle(unitHandle))) {
        gameapi.remove_unit_in_group(this.handle, unitHandle);
      }
    }
  }

  randomUnit() {
    const handle = gameapi.get_random_unit_in_unit_group(this.handle);
    return handle !== undefined ? Unit.fromHandle(handle) : undefined;
  }

  removeUnit(unit: Unit) {
    gameapi.remove_unit_in_group(this.handle, unit.handle);
  }

  clone() {
    return new Group();
  }
}
