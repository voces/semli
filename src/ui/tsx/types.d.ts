type UIActionProp = {
  action: "show" | "hide";
  comp?: string;
};

type SimpleAction = string | UIActionProp;

// unknown
type CLIP_TYPE = 0;

type ColorProp = number;

type PROGRESS_RING = 0;
type PROGRESS = PROGRESS_RING;

type BACKGROUND_COLOR = 0;
type BACKGROUND = BACKGROUND_COLOR;

type JUSTIFY_LEFT = 1;
type JUSTIFY_CENTER = 2;
type JUSTIFY_RIGHT = 4;
type JUSTIFY = JUSTIFY_LEFT | JUSTIFY_CENTER | JUSTIFY_RIGHT;

type ALIGN_TOP = 0;
type ALIGN_CENTER = 8;
type ALIGN_BOTTOM = 16;
type ALIGN = ALIGN_TOP | ALIGN_CENTER | ALIGN_BOTTOM;

type FONT_NAME_DEFAULT = "";
type FONT_NAME = FONT_NAME_DEFAULT;

/****************************
 * Nodes
 ****************************/

type NodeProps = {
  name?: string;
  uid?: string;
  x?: number;
  y?: number;
  size?: number;
  width?: number;
  height?: number;
  opacity?: number;
  draggable?: boolean;
  rotation?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  touchable?: boolean;
  visible?: boolean;
  // Simple events
  click?: SimpleAction;
};

type ImageNodeProps = NodeProps & { image: number };

type LayoutNodeProps = NodeProps & {
  clip?: boolean;
  clipType?: CLIP_TYPE;
  mask?: number;
  color?: ColorProp;
};

type PanelNodeProps = {
  name: string;
  uid?: string;
  zorder?: number;
  visible?: boolean;
  opacity?: number;
};

type ProgressNodeProps = NodeProps & {
  reverse?: boolean;
  percent?: number;
  progress?: PROGRESS;
  background?: BACKGROUND;
  unfillColor?: ColorProp;
  fillColor?: ColorProp;
  unfillImage?: number;
  fillImage?: number;
};

type TextNodeProps = NodeProps & {
  text: string;
  justify?: JUSTIFY;
  align?: ALIGN;
  fontSize?: number;
  fontName?: FONT_NAME;
  fontColor?: ColorProp;
  lineSpace?: number;
};

declare namespace JSX {
  interface IntrinsicElements {
    image: ImageNodeProps;
    layout: LayoutNodeProps;
    panel: PanelNodeProps;
    progress: ProgressNodeProps;
    text: TextNodeProps;
  }
}
