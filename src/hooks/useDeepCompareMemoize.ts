import React from 'react';
import deepEqual from 'fast-deep-equal/react';

/**
 * momoize值,会做一次浅比较
 * @param value
 */
function useDeepCompareMemoize<T>(value: T) {
  const ref = React.useRef<T>(value);
  const signalRef = React.useRef<number>(0);

  if (!deepEqual(value, ref.current)) {
    ref.current = value;
    signalRef.current++;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => ref.current, [signalRef.current]);
}

export default useDeepCompareMemoize;
