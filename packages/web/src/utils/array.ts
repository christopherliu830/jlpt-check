export function toLookup<E, K extends number | string | symbol>(array: E[], toKey: (element: E) => K) {
  const lookup: Record<K, E[]> = {} as Record<K, E[]>; // ?

  array.forEach((element) => {
    const key = toKey(element);
    lookup[key] = lookup[key] || [];
    lookup[key].push(element);
  });
  return lookup;
}
