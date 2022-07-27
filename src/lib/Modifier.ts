import { Ability } from "./Ability";
import { Handle } from "./Handle";
import { Unit } from "./Unit";

export class Modifier extends Handle<modifier> {
  static fromHandle(handle: modifier): Modifier {
    return this._fromHandle(handle) as any;
  }

  receiver() {
    return Unit.fromHandle(this.handle.api_get_owner());
  }

  ability() {
    const handle = globalapi.get_related_ability(this.handle);
    return handle !== undefined ? new Ability(handle) : undefined;
  }
}
