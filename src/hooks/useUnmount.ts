import { useEffect, useRef } from 'react';

/**
 * 在组件卸载时，执行方法
 * @param fn
 */
const useUnmount = (fn: any) => {
  const fnRef = useRef(fn);
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
