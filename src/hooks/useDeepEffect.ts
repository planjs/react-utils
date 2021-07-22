import { useRef, useEffect } from 'react';
import type { DependencyList, EffectCallback } from 'react';
import { isPrimitive } from '@planjs/utils';
import isDeepEqual from '../utils/isDeepEqual';

const warnDeps = (dependencies: DependencyList) => {
  if (dependencies.length === 0) {
    console.warn('useDeepEffect should not be used with no dependencies. Use useEffect instead.');
  }

  if (dependencies.every(isPrimitive)) {
    console.warn('useDeepEffect should not be used with primitive values. Use useEffect instead.');
  }
};

function useDeepCompareMemoize(value: DependencyList) {
  const ref = useRef<DependencyList>();
  const signalRef = useRef<number>(0);

  if (!isDeepEqual(value, ref.current)) {
    ref.current = value;
    signalRef.current += 1;
  }

  return [signalRef.current];
}

/**
 * 使用上与 useEffect 完全相同，只是它进行了深比较
 * @param fn
 * @param deps
 */
function useDeepEffect(fn: EffectCallback, deps: DependencyList): ReturnType<typeof useEffect> {
  if (process.env.NODE_ENV !== 'production') {
    warnDeps(deps);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(fn, useDeepCompareMemoize(deps));
}

export default useDeepEffect;
