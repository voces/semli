import { Handle } from "./Handle";
import { Player } from "./Player";
import { Projectile } from "./Projectile";
import { Unit } from "./Unit";

export class Ability extends Handle<ability> {
  static fromHandle(handle: ability) {
    return this._fromHandle(handle) as Ability;
  }

  static fromUnit(unit: Unit, type?: ABILITY_TYPE) {
    const abilities: Ability[] = [];
    const start = typeof type === "number" ? type : 0;
    const end = typeof type === "number" ? type + 1 : 4;
    for (let i = start; i < end; i++) {
      for (
        const [, ability] of python.enumerate(
          unit.handle.api_get_abilities_by_type(i),
        )
      ) {
        abilities.push(Ability.fromHandle(ability));
      }
    }

    return abilities;
  }

  unit() {
    return Unit.fromHandle(this.handle.api_get_owner());
  }

  owner() {
    return Player.fromHandle(this.handle.api_get_owner().api_get_role());
  }

  level() {
    return this.handle.api_get_level();
  }

  kvFloat(key: string) {
    return gameapi.get_kv_pair_value_float(this.handle, key);
  }

  createProjectileOnSocket(
    angle: angle,
    socket = "attack1",
    projectile = gameapi.get_kv_pair_value_projectile(
      this.handle,
      "projectile",
    ),
  ) {
    const unit = this.handle.api_get_owner();
    return new Projectile(gameapi.create_projectile_on_socket(
      projectile,
      unit,
      socket,
      angle,
      unit,
      this.handle,
      1,
    ));
  }
}
