declare const globalapi: {
  get_fixed_coord_index: (
    this: void,
    position: position,
    index: number,
  ) => Fix32;
  fixed_arithmetic_operation: (
    this: void,
    left: int | Fix32,
    operator: "+" | "*",
    right: int | Fix32,
  ) => Fix32;
  sqrt: (this: void, value: Fix32 | int) => number;
  fixed_to_str: (this: void, value: Fix32) => string;
  coord_to_point: (
    this: void,
    x: Fix32 | number,
    y: Fix32 | number,
    unknown: Fix32 | number,
  ) => position;
  create_circular_shape: (this: void, radius: Fix32) => circle;
  get_related_ability: (this: void, modifier: modifier) => ability | undefined;
  is_unit_alive: (this: void, unit: unit) => boolean;
  fixed_to_int32: (this: void, value: Fix32) => Int32;
};
