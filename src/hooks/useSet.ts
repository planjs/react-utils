import { useState, useMemo, useCallback } from 'react';

interface StableActions<K> {
  add: (key: K) => void;
  remove: (key: K) => void;
  reset: () => void;
}

interface Actions<K> extends StableActions<K> {
  has: (key: K) => boolean;
}

/**
 * 传入一个 Set 可接受的参数
 * @param initialValue
 */
function useSet<K>(initialValue?: Iterable<K>): [Set<K>, Actions<K>] {
  const initialSet = useMemo<Set<K>>(
    () => (initialValue === undefined ? new Set() : new Set(initialValue)) as Set<K>,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const [set, setSet] = useState(initialSet);

  const stableActions = useMemo<StableActions<K>>(
    () => ({
      add: (key) => setSet((prevSet) => new Set([...Array.from(prevSet), key])),
      remove: (key) => setSet((prevSet) => new Set(Array.from(prevSet).filter((i) => i !== key))),
      reset: () => setSet(initialSet),
    }),
    [initialSet],
  );

  const utils = {
    has: useCallback((key) => set.has(key), [set]),
    ...stableActions,
  } as Actions<K>;

  return [set, utils];
}

export default useSet;
