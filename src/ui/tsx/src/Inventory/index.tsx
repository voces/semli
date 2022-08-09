import { createElement } from "basic-pragma";
import { Slot } from "./Slot";

const INVENTORY_BACKGROUND = 134280992;
const CLOSE_ICON = 134272484;

export const Inventory = () => (
  <image
    name="inventory"
    image={INVENTORY_BACKGROUND}
    width={342}
    height={484}
    right={16}
    top={285}
    draggable
    touchable
  >
    <image
      image={CLOSE_ICON}
      size={24}
      top={2}
      right={2}
      click={{ action: "hide", comp: "inventory" }}
    />

    {Array.from(
      Array(7),
      (_, y) => Array.from(Array(6), (_, x) => <Slot x={x} y={y} />),
    ).flat()}
  </image>
);
