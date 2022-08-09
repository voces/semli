import { createElement } from "basic-pragma";

const TRANSPARENT = 999;

export const Slot = ({ x, y }: { x: number; y: number }) => (
  <image
    name={`slot${y * 6 + x}`}
    size={49}
    x={38 + x * 49.75}
    y={338 - y * 49.75}
    image={TRANSPARENT}
  >
    <text name={`slotStack${y * 6 + x}`} text={"1"} height={18} bottom={0} />
  </image>
);
