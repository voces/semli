import type { Ability } from "./Ability";

import { Handle } from "./Handle";
import { Player } from "./Player";
import { Position } from "./Position";

export class Unit extends Handle<unit> {
  static fromHandle(handle: unit) {
    return this._fromHandle(handle) as Unit;
  }

  constructor(
    type: number,
    player: Player,
    position: Position,
    orientation = 180,
  ) {
    if (Handle.initFromHandle()) {
      super();
      return;
    }

    super(
      gameapi.create_unit(
        type,
        position.handle,
        Fix32(orientation),
        player.handle,
      ),
    );
  }

  position() {
    return Position.fromHandle(this.handle.api_get_position());
  }

  owner() {
    return Player.fromHandle(this.handle.api_get_role());
  }

  angleTo(position: Position) {
    return gameapi.get_points_angle(
      this.handle.api_get_position(),
      position.handle,
    );
  }

  damageTarget(target: Unit, amount: number, damageType: 1 | 2 | 3) {
    if (!globalapi.is_unit_alive(target.handle)) return;

    gameapi.apply_damage(
      this.handle,
      null,
      target.handle,
      damageType,
      Fix32(amount),
      false,
    );

    target.playAnimation("hit");
  }

  name() {
    return this.handle.api_get_name();
  }

  isAlly(unit: Unit) {
    return gameapi.is_ally(this.handle, unit.handle);
  }

  isEnemy(unit: Unit) {
    return gameapi.is_enemy(this.handle, unit.handle);
  }

  playAnimation(
    animation: string,
    { rate = 1, start = 0, end = -1, loop = false } = {},
  ) {
    this.handle.api_play_animation(
      animation,
      Fix32(rate),
      Fix32(start),
      Fix32(end),
      loop,
      true,
    );
  }

  face(angle: angle, duration = 0) {
    this.handle.api_set_face_angle(angle, duration);
  }

  setPosition(position: Position, force = false) {
    if (force) this.handle.api_force_transmit(position.handle);
    else this.handle.api_transmit(position.handle);
  }

  addModifier(
    modifierId: number,
    opts?: {
      affiliatedUnit?: Unit;
      affiliatedAbility?: Ability;
      duration?: number;
      period?: number;
      stacks?: number;
    },
  ) {
    this.handle.api_add_modifier(
      modifierId,
      opts?.affiliatedUnit?.handle,
      opts?.affiliatedAbility?.handle,
      Fix32(opts?.duration ?? -1),
      Fix32(opts?.period ?? 0),
      opts?.stacks ?? 1,
    );
  }

  isAlive() {
    return globalapi.is_unit_alive(this.handle);
  }

  isHero() {
    return this.handle.is_hero;
  }

  setMovementSpeed(amount: number) {
    this.handle.api_set_attr_by_attr_element(
      "ori_speed",
      Fix32(amount),
      "ATTR_BASE",
    );
  }

  adjustMovementSpeed(amount: number) {
    this.handle.api_add_attr_by_attr_element(
      "ori_speed",
      Fix32(amount),
      "ATTR_BASE",
    );
  }

  getFloat(attribute: string) {
    return this.handle.api_get_float_attr(attribute).float();
  }

  getMaxHP() {
    return this.handle.api_get_float_attr("hp_max").float();
  }

  getCurrentHP() {
    return this.handle.api_get_float_attr("hp_cur").float();
  }

  getMaxMP() {
    return this.handle.api_get_float_attr("mp_max").float();
  }

  getCurrentMP() {
    return this.handle.api_get_float_attr("mp_cur").float();
  }

  getIcon() {
    return gameapi.get_icon_id_by_unit_type(this.handle.api_get_key());
  }

  visibleTo(player: Player | Unit) {
    return gameapi.get_visibility_of_unit(player.handle, this.handle);
  }

  walkTo(position: Position) {
    this.handle.api_release_command(
      gameapi.create_unit_command_move_to_pos(position.handle),
    );
  }

  isMoving() {
    return this.handle.api_is_moving();
  }

  isBattling() {
    return this.handle.api_is_in_battle_state();
  }

  hasAbility(abilityType: number) {
    return this.handle.api_check_has_ability_type(abilityType);
  }

  exists() {
    return gameapi.unit_is_exist(this.handle);
  }

  // getAbilitiesByType(type: ABILITY_TYPE) {
  //   const abilities: Ability[] = [];

  //   for (
  //     const [, ability] of python.enumerate(
  //       this.handle.api_get_abilities_by_type(type),
  //     )
  //   ) {
  //     abilities.push(Ability.fromHandle(ability));
  //   }

  //   return abilities;
  // }

  // getAbilities(type?: ABILITY_TYPE) {
  //   if (typeof type === "number") return this.getAbilitiesByType(type);

  //   const abilities: Ability[] = [];
  //   for (let i = 0; i < 4; i++) {
  //     abilities.push(...this.getAbilitiesByType(i as ABILITY_TYPE));
  //   }

  //   return abilities;
  // }
}
