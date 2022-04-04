import { useEffect, EffectCallback, DependencyList, useState } from 'react';

import useDebounceFn from './useDebounceFn';
import useUpdateEffect from './useUpdateEffect';
import useUnmount from './useUnmount';

function useDebounceEffect(effect: EffectCallback, wait: number, deps?: DependencyList) {
  const [flag, setFlag] = useState({});

  const { run, cancel } = useDebounceFn(() => {
    setFlag({});
  }, wait);

  useEffect(() => {
    return run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useUnmount(cancel);

  useUpdateEffect(effect, [flag]);
}

export default useDebounceEffect;
