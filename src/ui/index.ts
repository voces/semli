import "./mouse";
import "./inventory";
import { newGlobalTrigger } from "../lib/Trigger";
import { linkUnit } from "./linkUnit";
import { Unit } from "../lib/Unit";
import { linkUnitStats } from "./progress";
import { Player } from "../lib/Player";
import { Position } from "../lib/Position";
import { UNIT_TYPE } from "../constants";

newGlobalTrigger(EVENT.GAME_INIT, () => {
  Player.forEach((p) => {
    p.hideUI("hover");
    p.setMouseMoveSelect(false);
    p.setMouseClickSelect(false);
  });
});

const t = newGlobalTrigger(EVENT.TIMEOUT, () =>
  Player.forEach((p) => {
    const u = new Unit(UNIT_TYPE.HERO, p, new Position(224, -768));
    p.follow(u);
    linkUnitStats(p, u);
    linkUnit(u);
  }));
t.event.delay = () => Fix32(1);
