import { useEffect } from 'react';
import type { EffectCallback } from 'react';

/**
 * @description 模拟react类组件的componentDidMount()
 */
const useMount = (fn: EffectCallback) => {
  useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMount;
