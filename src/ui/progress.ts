import type { Unit } from "../lib/Unit";

import { newGlobalTrigger } from "../lib/Trigger";
import { Timer } from "../lib/Timer";
import { Player } from "../lib/Player";

const hoverUnitMap = new Map<number, Unit>();
export const linkHoverUnit = (
  player: Player,
  unit: Unit | undefined,
) => {
  if (!unit) {
    player.hideUI("hover_progress");
    hoverUnitMap.delete(player.id());
    return;
  }

  player.setUIText("hover_text", unit.name());
  hoverUnitMap.set(player.id(), unit);
  player.setUIProgress("hover_progress", unit.getCurrentHP(), unit.getMaxHP());
  player.showUI("hover_progress");
};

const statsMap = new Map<number, Unit | undefined>();
export const linkUnitStats = (player: Player, unit: Unit | undefined) => {
  if (!unit) {
    statsMap.delete(player.id());
    return;
  }

  statsMap.set(player.id(), unit);
  player.setUIProgress("hp", unit.getCurrentHP(), unit.getMaxHP());
  player.setUIProgress("mp", unit.getCurrentMP(), unit.getMaxMP());
};

const update = (player: Player, i: number) => {
  const hoverUnit = hoverUnitMap.get(i);
  if (hoverUnit) {
    player.setUIProgress(
      "hover_progress",
      hoverUnit.getCurrentHP(),
      hoverUnit.getMaxHP(),
    );
  }

  const main = statsMap.get(i);
  if (main) {
    player.setUIProgress("hp", main.getCurrentHP(), main.getMaxHP());
    player.setUIProgress("mp", main.getCurrentMP(), main.getMaxMP());
  } else gameapi.print_to_dialog(3, "does not have main");
};
export const getStatsUnit = (player: Player) => statsMap.get(player.id());

newGlobalTrigger(
  EVENT.GAME_INIT,
  () => new Timer(0.25, () => Player.forEach((p, id) => update(p, id))),
);
