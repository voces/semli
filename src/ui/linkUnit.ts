import type { Player } from "../lib/Player";
import { Ability } from "../lib/Ability";
import { Unit } from "../lib/Unit";
import { getStatsUnit, linkUnitStats } from "./progress";

export const linkUnit = (unit: Unit) => {
  const player = unit.owner();
  linkUnitStats(player, unit);

  player.setUIImage("hero_icon", unit.getIcon());

  const abilities = Ability.fromUnit(unit);
  for (let i = 0; i < abilities.length && i < 10; i++) {
    player.showUI(`skill_btn_${i}`);
    player.linkUISkill(`skill_btn_${i}`, abilities[i]);
  }

  for (let i = abilities.length; i < 10; i++) player.hideUI(`skill_btn_${i}`);
};

export const getMainUnit = (player: Player) => getStatsUnit(player);
