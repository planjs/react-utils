import { useEffect, EffectCallback, DependencyList, useState } from 'react';
import useThrottleFn from './useThrottleFn';
import useUpdateEffect from './useUpdateEffect';
import useUnmount from './useUnmount';

function useThrottleEffect(effect: EffectCallback, wait: number, deps?: DependencyList) {
  const [flag, setFlag] = useState({});

  const { run, cancel } = useThrottleFn(() => {
    setFlag({});
  }, wait);

  useEffect(() => {
    return run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useUnmount(cancel);

  useUpdateEffect(effect, [flag]);
}

export default useThrottleEffect;
