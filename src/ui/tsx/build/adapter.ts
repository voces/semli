import { setAdapter } from "basic-pragma";
import type { Node } from "./nodes/createNode";
import { createImageNode } from "./nodes/createImageNode";
import { createLayoutNode } from "./nodes/createLayoutNode";
import { createPanelNode } from "./nodes/createPanelNode";
import { createProgressNode } from "./nodes/createProgressNode";
import { createTextNode } from "./nodes/createTextNode";
import { getParent, setParent } from "./parent";

const absurd = (v: never) => {
  throw new Error(`Unexpected ${v}`);
};

const createNodeFrame = (
  type: keyof JSX.IntrinsicElements,
  props: any,
): Node => {
  if (type === "text") return createTextNode(props);
  if (type === "layout") return createLayoutNode(props);
  if (type === "image") return createImageNode(props);
  if (type === "progress") return createProgressNode(props);
  if (type === "panel") return createPanelNode(props) as unknown as Node;
  absurd(type);
  return null as unknown as Node;
};

setAdapter({
  createFrame: (type, tParent: Node, props) => {
    const oldParent = getParent();
    setParent(tParent);
    const node = createNodeFrame(type as keyof JSX.IntrinsicElements, props);
    setParent(oldParent);
    tParent.children.push(node);
    return node;
  },
  updateFrameProperties: () => {},
});
