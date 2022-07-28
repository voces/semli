import "./mouse";
import "./inventory";
import { newGlobalTrigger } from "../lib/Trigger";
import { linkUnit } from "./linkUnit";
import { Unit } from "../lib/Unit";
import { linkUnitStats } from "./progress";
import { Player } from "../lib/Player";
import { Position } from "../lib/Position";

newGlobalTrigger(EVENT.GAME_INIT, () => {
  Player.forEach((p) => {
    p.hideUI("hover");
    p.setMouseMoveSelect(false);
    p.setMouseClickSelect(false);
  });
});

const t = newGlobalTrigger(EVENT.TIMEOUT, () =>
  Player.forEach((p) => {
    const u = new Unit(134261143, p, new Position());
    p.follow(u);
    linkUnitStats(p, u);
    linkUnit(u);
  }));
t.event.delay = () => Fix32(1);
