import { Group } from "../lib/Group";
import { Player } from "../lib/Player";
import { Position } from "../lib/Position";
import { newGlobalTrigger } from "../lib/Trigger";
import { Unit } from "../lib/Unit";
import { linkHoverUnit } from "./progress";

newGlobalTrigger(EVENT.MOUSE_MOVE_EVENT, (_, data) => {
  const pos = Position.fromHandle(data.__pointing_world_pos!);
  const player = Player.fromId(data.__role_id!);

  let nearest: Unit | undefined;
  let distance: number = 10000;

  Group.fromNearby(pos, 128).forEach((u) => {
    if (u.owner().id() == player.id() && u.isHero()) return;

    const d = u.position().distance(pos);
    if (d < distance) {
      distance = d;
      nearest = u;
    }
  });

  linkHoverUnit(player, nearest);
});
