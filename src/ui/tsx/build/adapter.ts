import { setAdapter } from "basic-pragma";
import { randomUUID } from "crypto";

const absurd = (v: never) => {
  throw new Error(`Unexpected ${v}`);
};

type NODE_TYPE_UNSET = -1;
type NODE_TYPE_PANEL = 2;
type NODE_TYPE_TEXT = 3;
type NODE_TYPE_IMAGE = 4;
type NODE_TYPE_PROGRESS = 5;
type NODE_TYPE_LAYOUT = 7;
type NODE_TYPE =
  | NODE_TYPE_UNSET
  | NODE_TYPE_PANEL
  | NODE_TYPE_TEXT
  | NODE_TYPE_IMAGE
  | NODE_TYPE_PROGRESS
  | NODE_TYPE_LAYOUT;

type Tuple<T> = { __tuple__: true; items: T };

type Color = Tuple<[red: number, blue: number, green: number, alpha: number]>;

type ColorPropToNode = <T extends ColorProp | undefined>(
  prop: T,
) => T extends number ? Color : undefined;
const colorPropToNode = ((prop: ColorProp | undefined): Color | undefined => {
  if (prop === undefined) return;
  return ({
    __tuple__: true,
    items: [
      (prop & 0xff0000) / 0x10000,
      (prop & 0xff00) / 0x100,
      prop & 0xff,
      prop > 0xffffff ? (prop & 0xff000000) / 0x1000000 : 255,
    ],
  });
}) as ColorPropToNode;

let parent: Node;

const UI_ANIM_UNIFORM = 0;
type UI_ANIM_EASE_IN = 12;
type UI_ANIM_EASE_OUT = 22;
type UI_ANIM_EASE_IN_OUT = 32;
type UI_ANIM =
  | typeof UI_ANIM_UNIFORM
  | UI_ANIM_EASE_IN
  | UI_ANIM_EASE_OUT
  | UI_ANIM_EASE_IN_OUT;

type UI_ACTION_ANIMATE = 1;
const UI_ACTION_SHOW = 2;
const UI_ACTION_HIDE = 3;
type UI_ACTION =
  | UI_ACTION_ANIMATE
  | typeof UI_ACTION_SHOW
  | typeof UI_ACTION_HIDE;

type UIAction = {
  anim_duration: number;
  anim_name: null;
  anim_type: 0;
  comp: string;
  ease_type: UI_ANIM;
  name: string;
  type: UI_ACTION;
};

type UI_EVENT_UNSET = -1;
const UI_EVENT_CLICK = 1;
type UI_EVENT_DOUBLE_CLICK = 22;
type UI_EVENT_PRESS = 3;
type UI_EVENT_ENTER = 24;
type UI_EVENT_HOVER = 23;
type UI_EVENT_RETURN_TO_LOBBY = 11;
type UI_EVENT_GAME_RESUME = 18;
type UI_EVENT_EXIT = 25;
type UI_EVENT_RIGHT_CLICK = 26;
type UI_EVENT =
  | UI_EVENT_UNSET
  | typeof UI_EVENT_CLICK
  | UI_EVENT_DOUBLE_CLICK
  | UI_EVENT_PRESS
  | UI_EVENT_ENTER
  | UI_EVENT_HOVER
  | UI_EVENT_RETURN_TO_LOBBY
  | UI_EVENT_GAME_RESUME
  | UI_EVENT_EXIT
  | UI_EVENT_RIGHT_CLICK;

type UIEvent = {
  type: UI_EVENT;
  name: string;
  enabled: boolean;
  action_list: UIAction[];
  sound_id: number | null;
  time?: number;
};

const EVENT_TYPE = {
  click: UI_EVENT_CLICK,
} as const;

const eventIndicies = Object.fromEntries(
  Object.keys(EVENT_TYPE).map((key) => [key, 0]),
) as Record<keyof typeof EVENT_TYPE, number>;

const ACTION_TYPE = {
  show: UI_ACTION_SHOW,
  hide: UI_ACTION_HIDE,
} as const;

const actionIndicies = Object.fromEntries(
  Object.keys(ACTION_TYPE).map((key) => [key, 0]),
) as Record<keyof typeof ACTION_TYPE, number>;

const eventKeys = ["click"] as const;
const createEventList = (props: NodeProps): UIEvent[] => {
  const events: UIEvent[] = [];

  for (const eventName of eventKeys) {
    const event = props[eventName];
    if (!event) continue;

    if (typeof event === "string") {
      events.push({
        type: EVENT_TYPE[eventName],
        name: event,
        enabled: true,
        action_list: [],
        sound_id: null,
      });
    } else {
      events.push({
        type: EVENT_TYPE[eventName],
        name: `${eventName}_${eventIndicies[eventName]++}`,
        enabled: true,
        action_list: [{
          anim_duration: 1,
          anim_name: null,
          anim_type: 0,
          comp: event.comp ?? "",
          ease_type: UI_ANIM_UNIFORM,
          name: `${event.action}_${actionIndicies[event.action]++}`,
          type: ACTION_TYPE[event.action],
        }],
        sound_id: null,
      });
    }
  }

  return events;
};

export type Node = {
  type: NODE_TYPE;
  name: string | undefined;
  uid: string;
  event_list: UIEvent[];
  pos: Tuple<[number, number]>;
  pos_percent: Tuple<[number, number]>;
  size: Tuple<[number, number]>;
  opacity: number | undefined;
  can_drag: boolean | undefined;
  rotation: number | undefined;
  swallow_touches: boolean | undefined;
  visible: boolean | undefined;
  adapter_option:
    | readonly [
      boolean,
      boolean,
      boolean,
      boolean,
      number,
      number,
      number,
      number,
    ]
    | undefined;
  children: Node[];
};
const createNode = (props: NodeProps): Node => {
  const width = props.width ?? props.size ?? parent.size.items[0];
  const height = props.height ?? props.size ?? parent.size.items[1];

  const usingAdapter = typeof props.top === "number" ||
    typeof props.bottom === "number" ||
    typeof props.left === "number" ||
    typeof props.right === "number";

  const adapterOption = usingAdapter
    ? [
      typeof props.top === "number",
      typeof props.bottom === "number",
      typeof props.left === "number",
      typeof props.right === "number",
      props.top ??
        (parent.size.items[1] - height - (props.bottom ?? 0)),
      props.bottom ??
        (parent.size.items[1] - height - (props.top ?? 0)),
      props.left ?? (parent.size.items[0] - width - (props.right ?? 0)),
      props.right ?? (parent.size.items[0] - width - (props.left ?? 0)),
    ] as const
    : undefined;

  const pos: Tuple<[number, number]> = {
    __tuple__: true,
    items: [
      props.x ??
        (usingAdapter
          ? adapterOption![6] + width / 2
          : parent.size.items[0] / 2),
      props.y ??
        (usingAdapter
          ? adapterOption![5] + height / 2
          : parent.size.items[1] / 2),
    ],
  };

  return {
    type: -1, // should be overwritten
    name: props.name,
    uid: props.uid ?? props.name ?? randomUUID(),
    opacity: props.opacity,
    event_list: createEventList(props),
    can_drag: props.draggable,
    rotation: props.rotation,
    swallow_touches: props.touchable,
    visible: props.visible,
    pos,
    pos_percent: {
      __tuple__: true,
      items: [
        pos.items[0] / parent.size.items[0] * 100,
        pos.items[1] / parent.size.items[1] * 100,
      ],
    },
    size: { __tuple__: true, items: [width, height] },
    adapter_option: adapterOption,
    children: [],
  };
};

type PanelNode = {
  type: NODE_TYPE_PANEL;
  name: string;
  uid: string;
  opacity: number;
  visible: boolean;
  zorder: number;
  editor_visible: boolean;
  children: Node[];
};
const createPanelNode = (props: PanelNodeProps): PanelNode => {
  const node: PanelNode = {
    type: 2,
    name: props.name,
    uid: props.uid ?? props.name ?? randomUUID(),
    visible: props.visible ?? true,
    zorder: props.zorder ?? 1000,
    editor_visible: true,
    opacity: props.opacity ?? 1,
    children: [],
  };
  Object.defineProperty(node, "size", { value: { items: [1920, 1080] } });

  return node;
};

type TextNode = Node & {
  type: NODE_TYPE_TEXT;
  text: Tuple<[text: string, unknown: false]>;
  alignment?: Tuple<[JUSTIFY, ALIGN]>;
  font: Tuple<[fontName: FONT_NAME, size: number]>;
  font_color: Color | undefined;
  line_space?: number;
};
const createTextNode = (props: TextNodeProps): TextNode => ({
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

type ImageNode = Node & {
  type: NODE_TYPE_IMAGE;
  image: number;
};
const createImageNode = (props: ImageNodeProps): ImageNode => ({
  ...createNode(props),
  type: 4,
  image: props.image,
});

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
const createProgressNode = (props: ProgressNodeProps): ProgressNode => ({
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

type LayoutNode = Node & {
  type: NODE_TYPE_LAYOUT;
  clip_enabled: boolean | undefined;
  clipping_type: CLIP_TYPE | undefined;
  mask_image: number | undefined;
  color: Color | undefined;
};
const createLayoutNode = (props: LayoutNodeProps): LayoutNode => ({
  ...createNode(props),
  type: 7,
  clip_enabled: props.clip ? true : undefined,
  clipping_type: props.clipType,
  mask_image: props.mask,
  color: colorPropToNode(props.color),
});

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
    const oldParent = parent;
    parent = tParent;
    const node = createNodeFrame(type as keyof JSX.IntrinsicElements, props);
    parent = oldParent;
    tParent.children.push(node);
    return node;
  },
  updateFrameProperties: () => {},
});
