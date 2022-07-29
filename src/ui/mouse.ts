import type { Unit } from "../lib/Unit";

import { Group } from "../lib/Group";
import { Player } from "../lib/Player";
import { Position } from "../lib/Position";
import { newGlobalTrigger } from "../lib/Trigger";
import { linkHoverUnit } from "./progress";
import { getMainUnit } from "./linkUnit";
import { MOUSE } from "../constants";

const mouseMap = new Map<number, boolean>();

newGlobalTrigger(EVENT.MOUSE_MOVE_EVENT, (_, data) => {
  const pos = Position.fromHandle(data.__pointing_world_pos!);
  const player = Player.fromId(data.__role_id!);

  let nearest: Unit | undefined;
  let distance: number = 10000;

  Group.fromNearby(pos, 128).forEach((u) => {
    if (u.owner().id() == player.id() && u.isHero() || !u.visibleTo(player)) {
      return;
    }

    const d = u.position().distance(pos);
    if (d < distance) {
      distance = d;
      nearest = u;
    }
  });

  linkHoverUnit(player, nearest);

  const main = getMainUnit(player);
  if (main) {
    if (mouseMap.get(data.__role_id!)) {
      main.walkTo(pos);
      main.playAnimation("run", { loop: true });
    } else if (!main.isMoving()) main.face(main.angleTo(pos), 125);
  }
});

newGlobalTrigger([EVENT.MOUSE_KEY_DOWN_EVENT, MOUSE.LEFT], (_, data) => {
  mouseMap.set(data.__role_id!, true);
  const pos = Position.fromHandle(data.__pointing_world_pos!);
  const player = Player.fromId(data.__role_id!);

  const main = getMainUnit(player);
  if (!main) return;

  main.walkTo(pos);
});

newGlobalTrigger([EVENT.MOUSE_KEY_UP_EVENT, MOUSE.LEFT], (_, data) => {
  mouseMap.set(data.__role_id!, false);
});
