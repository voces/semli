import "./mouse";
import { newGlobalTrigger } from "../lib/Trigger";
import { Player } from "../lib/Player";

const inventoryVisibleMap = new Map<number, boolean>();

newGlobalTrigger(EVENT.GAME_INIT, () => {
  Player.forEach((p) => {
    p.mapButtonShortcut("inventoryButton", 0x17);
    inventoryVisibleMap.set(p.id(), false);
  });
});

newGlobalTrigger(
  [EVENT.TRIGGER_COMPONENT_EVENT, "inventoryButtonClick"],
  (_, data) => {
    const pid = data.__role_id!;
    const player = Player.fromId(pid);

    if (inventoryVisibleMap.get(pid)) {
      player.hideUI("inventory");
      inventoryVisibleMap.set(pid, false);
    } else {
      player.showUI("inventory");
      inventoryVisibleMap.set(pid, true);
    }
  },
);

newGlobalTrigger(
  [EVENT.TRIGGER_COMPONENT_EVENT, "closeInventoryClick"],
  (_, data) => {
    const pid = data.__role_id!;
    const player = Player.fromId(pid);

    player.hideUI("inventory");
    inventoryVisibleMap.set(pid, false);
  },
);
