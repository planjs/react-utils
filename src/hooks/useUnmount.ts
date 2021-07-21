import { useEffect, useRef } from 'react';
import type { EffectCallback } from 'react';

/**
 * 在组件卸载时，执行方法
 * @param fn
 */
const useUnmount = (fn: EffectCallback) => {
  const fnRef = useRef<EffectCallback>(fn);
  fnRef.current = fn;

  useEffect(() => {
    return () => {
      if (fnRef.current && typeof fnRef.current === 'function') {
        fnRef.current();
      }
    };
  }, []);
};

export default useUnmount;
