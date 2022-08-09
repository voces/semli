/// <reference types="../types" />
import { inspect } from "util";
import { mkdir, rm, writeFile } from "fs/promises";
import { render } from "basic-pragma";
import { App } from "../src/App";
import { Node } from "./adapter";
import "./adapter";

globalThis.print = console.log;

// Clean up dir
const dirSetup = rm("dist/ui", { recursive: true }).catch(() => {}).then(() =>
  mkdir("dist/ui", { recursive: true })
);

// Render the tree
const root = {
  children: [] as Node[],
  size: { __tuple__: true, items: [1920, 1080] },
};
const app = App();
render(app, root);

// Sort props alphabetically
const sortObj = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => typeof v === "object" && v !== null ? sortObj(v) : v);
  }
  return Object.fromEntries(
    Object.keys(obj).sort().map(
      (key) => [
        key,
        typeof obj[key] === "object" && obj[key] !== null
          ? sortObj(obj[key])
          : obj[key],
      ],
    ),
  );
};

(async () => {
  // Ensure directory setup
  await dirSetup;

  // Write files
  for (let i = 0; i < root.children.length; i++) {
    const child = root.children[i];
    writeFile(
      `dist/ui/${child.name ?? i}.json`,
      JSON.stringify(sortObj(child), null, 4),
    );
  }
})();
