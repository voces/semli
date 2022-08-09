import { createElement } from "basic-pragma";

const INVENTORY_BACKGROUND = 134280992;
const CLOSE_ICON = 134272484;
const INVISIBLE = 999;

const Slot = ({ x, y }: { x: number; y: number }) => (
  <image
    name={`slot${y * 6 + x}`}
    size={49}
    x={38 + x * 49.75}
    y={338 - y * 49.75}
    image={INVISIBLE}
  >
    <text name={`slotStack${y * 6 + x}`} text={"1"} height={18} bottom={0} />
  </image>
);

const Inventory = () => (
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

export const App = () => (
  <panel name="mainTsx">
    <Inventory />
  </panel>
);
