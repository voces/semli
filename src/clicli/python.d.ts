declare const python: {
  enumerate: <T>(
    this: void,
    array: T[],
  ) => LuaIterable<LuaMultiReturn<[number, T]>>;
  // fix32: Fix32,
  // as_attrgetter: <T>(this: void, obj: T) => T;
  // as_itemgetter: <T>(this: void, obj: T) => T;
  // iterex
  // as_function
  // Fix32Vec3
  // Fix32
  // fix32vec3
  // iter
  // none
};

declare interface pydict {
  __pydict: pydict;
  (this: void): pydict;
  [key: string]: any;
}

declare const pydict: pydict;

declare interface Fix32 {
  __fix32: never;
  (this: void, value: number): Fix32;
  float: () => number;
}
declare const Fix32: Fix32;

declare interface Int32 {
  __int32: never;
  (this: void, value: number): Int32;
}
declare const Int32: Int32;
