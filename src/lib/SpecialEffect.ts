import { Handle } from "./Handle";
import { Position } from "./Position";
import { Unit } from "./Unit";

export class SpecialEffect extends Handle<special_effect> {
  constructor(
    effectId: number,
    position: Position | Unit,
    opts: {
      orientation?: number;
      scale?: number;
      height?: number;
      duration?: number;
      attachPoint?: string;
      rotate?: boolean;
      proportionalScale?: boolean;
    } = {},
  ) {
    if (Handle.initFromHandle()) {
      super();
      return;
    }

    if (position instanceof Unit) {
      super(
        gameapi.create_sfx_on_unit(
          effectId,
          position.handle,
          opts.attachPoint ?? "",
          opts.rotate ?? true,
          opts.proportionalScale ?? true,
          Fix32(opts.scale ?? 1),
          Fix32(opts.duration ?? 10),
        ),
      );
      return;
    }

    super(gameapi.create_sfx_on_point(
      effectId,
      position.handle,
      Fix32(opts.orientation ?? 0),
      Fix32(opts.scale ?? 1),
      Fix32(opts.height ?? 0),
      Fix32(opts.duration ?? 10),
    ));
  }
}
