import { useEffect } from 'react';

/**
 * @description 模拟react类组件的componentDidMount()
 */
const useMount = (fn: Function) => {
  useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMount;
