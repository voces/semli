import { Handle } from "./Handle";
import { Position } from "./Position";
import { Shape } from "./Shape";

export class Rectangle extends Shape<rectangle> {
  constructor(center: Position, width: number, height: number) {
    if (Handle.initFromHandle()) {
      super();
      return;
    }

    super(
      gameapi.create_rect_area_by_center(
        center.handle,
        Fix32(width),
        Fix32(height),
      ),
    );
  }
}
