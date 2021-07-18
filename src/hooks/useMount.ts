/**
 * @description 模拟react类组件的compoentDidMount()
 */
import { useEffect } from 'react';

const useMount = (fn: Function) => {
  useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMount;
