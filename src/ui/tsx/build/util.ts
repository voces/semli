import { Color } from "./types";

type ColorPropToNode = <T extends ColorProp | undefined>(
  prop: T,
) => T extends number ? Color : undefined;

export const colorPropToNode =
  ((prop: ColorProp | undefined): Color | undefined => {
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
