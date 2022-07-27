const map = new WeakMap<handle, Handle<any>>();

export class Handle<T extends handle> {
  public readonly handle: T;

  private static initHandle: handle | undefined;

  protected constructor(handle?: T) {
    this.handle = handle === undefined ? (Handle.initHandle as T) : handle;
    map.set(this.handle, this);
  }

  protected static initFromHandle() {
    return Handle.initHandle !== undefined;
  }

  static _fromHandle(handle: handle) {
    const obj = map.get(handle);
    if (obj !== undefined) return obj;
    Handle.initHandle = handle;
    const newObj = new this();
    Handle.initHandle = undefined;
    return newObj;
  }
}

let id = 73663000;
export const consumeId = () => id++;
