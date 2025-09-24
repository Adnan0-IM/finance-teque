export function omitKeys<
  T extends Record<string, unknown>,
  K extends readonly (keyof T)[]
>(obj: T, keys: K): Omit<T, K[number]> {
  const clone = { ...obj };
  for (const k of keys) delete clone[k];
  return clone;
}
