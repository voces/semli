import { NODE_TYPE_IMAGE } from "../types";
import { createNode, Node } from "./createNode";

type ImageNode = Node & {
  type: NODE_TYPE_IMAGE;
  image: number;
};

export const createImageNode = (props: ImageNodeProps): ImageNode => ({
  ...createNode(props),
  type: 4,
  image: props.image,
});
