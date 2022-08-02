import { Ability } from "../lib/Ability";

type Data = { damage?: (this: void, ability: Ability) => number };

export const store = new Map<number, Data>();

const getOrInit = (abilityType: number): Data => {
  const data = store.get(abilityType);
  if (data !== undefined) return data;

  const newData: Data = {};
  store.set(abilityType, newData);
  return newData;
};

export const set = <
  Attribute extends keyof Data,
  Value extends Data[Attribute],
>(
  abilityType: number,
  attr: Attribute,
  value: Value,
) => getOrInit(abilityType)[attr] = value;

export const get = <Attribute extends keyof Data>(
  abilityType: number,
  attr: Attribute,
) => getOrInit(abilityType)[attr];
