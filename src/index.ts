import "./abilities";
import { clearHandle } from "./lib/Handle";
import { newGlobalTrigger } from "./lib/Trigger";
import "./ui";
import "./game/death";

// Not in Unit to prevent cycles
newGlobalTrigger(EVENT.UNIT_REMOVE, (_, data) => {
  clearHandle(`unit-${data.__unit_id}`);
});
