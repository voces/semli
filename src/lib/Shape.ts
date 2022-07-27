import { Group } from "./Group";
import { Handle } from "./Handle";

export class Shape<S extends shape> extends Handle<S> {
  units() {
    return Group.fromHandle(gameapi.get_unit_group_in_area(this.handle));
  }
}
