import type { Ability } from "./Ability";
import type { Unit } from "./Unit";

import { MAX_PLAYERS } from "../constants";
import { Handle } from "./Handle";
import { Position } from "./Position";

export class Player extends Handle<player> {
  static fromHandle(handle: player) {
    return this._fromHandle(handle) as Player;
  }

  static fromInt(int: number) {
    const player = gameapi.get_role_by_int(int);
    if (!player) throw `Missing player int ${int}`;
    return this.fromHandle(player);
  }

  static fromId(id: number) {
    const player = gameapi.get_role_by_role_id(id);
    if (!player) throw `Missing player id ${id}`;
    return this.fromHandle(player);
  }

  static forEach(callback: (player: Player, id: number) => void) {
    for (let i = 0; i < MAX_PLAYERS; i++) {
      const player = gameapi.get_role_by_role_id(i);
      if (
        player && player.get_role_status() === 1 && player.get_role_type() === 1
      ) {
        callback(Player.fromHandle(player), i);
      }
    }
  }

  id() {
    return this.handle.get_role_id_num();
  }

  mousePosition() {
    return Position.fromHandle(gameapi.get_player_pointing_pos(this.handle));
  }

  message(message: string, localized = false) {
    gameapi.show_msg_to_role(this.handle, message, localized);
  }

  setMouseMoveSelect(enabled: boolean) {
    this.handle.set_role_mouse_move_select(enabled);
  }

  setMouseClickSelect(enabled: boolean) {
    this.handle.set_role_mouse_left_click(enabled);
  }

  follow(unit: Unit) {
    gameapi.camera_set_follow_unit(this.handle, unit.handle);
  }

  showUI(frame: string, animation = "") {
    gameapi.show_ui_comp_animation(this.handle, frame, animation);
  }

  hideUI(frame: string, animation = "") {
    gameapi.hide_ui_comp_animation(this.handle, frame, animation);
  }

  setUIProgress(frame: string, current: number, max: number) {
    gameapi.set_progress_bar_max_value(this.handle, frame, max);
    gameapi.set_progress_bar_current_value(this.handle, frame, current);
  }

  setUIText(frame: string, text: string) {
    gameapi.set_ui_comp_text(this.handle, frame, text);
  }

  setUIImage(frame: string, path: string) {
    gameapi.set_ui_comp_image(this.handle, frame, path);
  }

  linkUISkill(button: string, ability: Ability) {
    gameapi.set_skill_on_ui_comp(this.handle, ability.handle, button);
  }

  mapButtonShortcut(button: string, key: number) {
    gameapi.set_btn_short_cut(this.handle, button, key);
  }
}
