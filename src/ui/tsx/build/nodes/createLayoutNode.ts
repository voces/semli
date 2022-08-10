import { Color, NODE_TYPE_LAYOUT } from "../types";
import { colorPropToNode } from "../util";
import { createNode, Node } from "./createNode";

type LayoutNode = Node & {
  type: NODE_TYPE_LAYOUT;
  clip_enabled: boolean | undefined;
  clipping_type: CLIP_TYPE | undefined;
  mask_image: number | undefined;
  color: Color | undefined;
};

export const createLayoutNode = (props: LayoutNodeProps): LayoutNode => ({
  ...createNode(props),
  type: 7,
  clip_enabled: props.clip ? true : undefined,
  clipping_type: props.clipType,
  mask_image: props.mask,
  color: colorPropToNode(props.color),
});
