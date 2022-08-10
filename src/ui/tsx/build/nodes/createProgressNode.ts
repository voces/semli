import { Color, NODE_TYPE_PROGRESS } from "../types";
import { colorPropToNode } from "../util";
import { createNode, Node } from "./createNode";

type ProgressNode = Node & {
  type: NODE_TYPE_PROGRESS;
  reverse: boolean | undefined;
  percent: number | undefined;
  process_type: PROGRESS | undefined;
  background_type: BACKGROUND | undefined;
  color: Color | undefined;
  bg_color: Color | undefined;
  image: number | undefined;
  bg_image: number | undefined;
};

export const createProgressNode = (props: ProgressNodeProps): ProgressNode => ({
  ...createNode(props),
  type: 5,
  reverse: props.reverse,
  percent: props.percent,
  process_type: props.progress,
  background_type: props.background,
  color: colorPropToNode(props.fillColor),
  bg_color: colorPropToNode(props.unfillColor),
  image: props.fillImage,
  bg_image: props.unfillImage,
});
