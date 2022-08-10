import { Color, NODE_TYPE_TEXT, Tuple } from "../types";
import { colorPropToNode } from "../util";
import { createNode, Node } from "./createNode";

type TextNode = Node & {
  type: NODE_TYPE_TEXT;
  text: Tuple<[text: string, unknown: false]>;
  alignment?: Tuple<[JUSTIFY, ALIGN]>;
  font: Tuple<[fontName: FONT_NAME, size: number]>;
  font_color: Color | undefined;
  line_space?: number;
};

export const createTextNode = (props: TextNodeProps): TextNode => ({
  ...createNode(props),
  type: 3,
  text: { __tuple__: true, items: [props.text, false] },
  alignment: { __tuple__: true, items: [props.justify ?? 2, props.align ?? 8] },
  line_space: props.lineSpace,
  font_color: colorPropToNode(props.fontColor),
  font: {
    __tuple__: true,
    items: [props.fontName ?? "", props.fontSize ?? 18],
  },
});
