import { NODE_TYPE_PANEL } from "../types";

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

export const createPanelNode = (props: PanelNodeProps): PanelNode => {
  const node: PanelNode = {
    type: 2,
    name: props.name,
    uid: props.uid ?? props.name,
    visible: props.visible ?? true,
    zorder: props.zorder ?? 1000,
    editor_visible: true,
    opacity: props.opacity ?? 1,
    children: [],
  };
  Object.defineProperty(node, "size", { value: { items: [1920, 1080] } });

  return node;
};
