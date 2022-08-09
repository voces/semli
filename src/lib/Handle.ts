const map = new WeakMap<any, Handle<any>>();

export class Handle<T extends LuaUserdata> {
  public readonly handle: T;

  private static initHandle: LuaUserdata | undefined;

  protected constructor(handle?: T, key?: unknown) {
    this.handle = handle === undefined ? (Handle.initHandle as T) : handle;
    map.set(key ?? this.handle, this);
  }

  protected static initFromHandle() {
    return Handle.initHandle !== undefined;
  }

  static _fromHandle(handle: LuaUserdata, key?: unknown) {
    const obj = map.get(key ?? handle);
    if (obj !== undefined) return obj;
    Handle.initHandle = handle;
    const newObj = new this(undefined, key);
    Handle.initHandle = undefined;
    return newObj;
  }
}

let id = 73663000;
export const consumeId = () => id++;
export const clearHandle = (handle: unknown) => map.delete(handle);
