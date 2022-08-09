import { NEUTRAL_FRIENDLY } from "../constants";
import { Handle } from "./Handle";
import type { Player } from "./Player";
import { Position } from "./Position";
import type { Unit } from "./Unit";

export class Item extends Handle<item> {
  constructor(
    type: number,
    position: Position | Unit,
    { player, slot }: {
      player?: Player;
      slot?: number;
    } | {
      player?: Player;
      slot?: number;
    } = {},
  ) {
    if (Handle.initFromHandle()) {
      super();
      return;
    }

    const pos = position instanceof Position
      ? position.handle
      : position.position().handle;

    const item = gameapi.create_item_by_id(
      pos,
      type,
      player?.handle ?? gameapi.get_role_by_role_id(NEUTRAL_FRIENDLY)!,
    );

    super(item);

    if (!(position instanceof Position)) position.addItem(this, slot);
  }
}
