import type { Node } from "./nodes/createNode";

let parent: Node;

export const getParent = () => parent;
export const setParent = (node: Node) => parent = node;
