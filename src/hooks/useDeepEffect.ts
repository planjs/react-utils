import { useEffect, useRef } from 'react';
import _ from 'lodash';

/**
 * 使用上与 useEffect 完全相同，只是它进行了深比较
 * @param effect
 * @param deps
 */
const useDeepEffect: typeof useEffect = (effect, deps) => {
  const oldDepsRef = useRef<React.DependencyList>([]);

  useEffect(() => {
    const isUpdate = oldDepsRef.current.some((dep, index) => {
      return !_.isEqual(dep, deps?.[index]);
    });

    if (isUpdate) {
      oldDepsRef.current = deps || [];
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useDeepEffect;
