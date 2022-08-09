import type { Ability } from "./Ability";

import { Handle } from "./Handle";
import { Player } from "./Player";
import { Position } from "./Position";
import { SpecialEffect } from "./SpecialEffect";
import type { Item } from "./Item";

export class Unit extends Handle<unit> {
  static fromHandle(handle: unit) {
    return this._fromHandle(handle, `unit-${handle.api_get_id()}`) as Unit;
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

    const unit = gameapi.create_unit(
      type,
      position.handle,
      Fix32(orientation),
      player.handle,
    );

    super(unit, `unit-${unit.api_get_id()}`);
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

  attackTo(position: Position) {
    this.handle.api_release_command(
      gameapi.create_unit_command_attack_move(position.handle),
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

  revive(position?: Position) {
    const pos = position?.handle ?? this.handle.api_get_position();
    this.handle.api_revive(pos);
  }

  // Custom

  private _xp = 0;

  xp(value?: number) {
    if (typeof value === "number") this._xp = value;
    return this._xp;
  }

  addXp(value: number) {
    const prevLevel = this.level();
    this._xp = this._xp + value;
    const nextLevel = this.level();

    if (nextLevel > prevLevel) {
      new SpecialEffect(101919, this.position());
    }

    return this._xp;
  }

  xpPercentOfLevel() {
    const level = this.level();
    const min = (1 - (5 / 4) ** (level - 1)) * -2048;
    const max = (1 - (5 / 4) ** level) * -2048;
    return (this._xp - min) / (max - min);
  }

  level() {
    return Math.floor(Math.log(1 - this._xp * -1 / 2048) / Math.log(5 / 4)) + 1;
  }

  private _inventory: Record<number, Item | undefined> = {};

  handledItem: Item | undefined;

  addItem(item: Item, slot?: number) {
    // Clear slot if already in inventory
    for (let i = 0; i < 128; i++) {
      if (item === this._inventory[i]) {
        this._inventory[i] = undefined;
        i = 128;
      }
    }

    // Designated slot: transfer item currently in that slot to handled item
    if (typeof slot === "number") {
      if (this._inventory[slot] !== undefined) {
        // Drop the currently handled item if there already is one
        if (this.handledItem) {
          this.handledItem.handle.api_drop_self(this.handle.api_get_position());
        }
        this.handledItem = this._inventory[slot];
      }
      this._inventory[slot] = item;
      gameapi.print_to_dialog(3, `ashift item ${slot + 1}`);
      this.handle.api_shift_item(item.handle, 1, slot + 1);
      return;
    }

    // Just add item to first available slot
    for (let i = 0; i < 128; i++) {
      if (this._inventory[i] === undefined) {
        this._inventory[i] = item;
        if (i < 3) {
          gameapi.set_item_on_ui_comp(
            this.handle.api_get_role(),
            item.handle,
            `equip_slot_${i + 1}`,
          );
        }
        gameapi.print_to_dialog(3, `bshift item ${i + 1}`);
        this.handle.api_shift_item(item.handle, 1, i + 1);
        return;
      }
    }

    // No slots available: drop it on the ground
    item.handle.api_drop_self(this.handle.api_get_position());
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
