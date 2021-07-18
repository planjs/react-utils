import { useCallback } from 'react';
import useToggle from './useToggle';

/**
 * 默认切换布尔值状态，也可以接收一个参数作为新的值
 */
const useBoolean = (defaultValue: boolean = false) => {
  const { state, toggle } = useToggle(defaultValue);

  const setTrue = useCallback(() => toggle(true), [toggle]);

  const setFalse = useCallback(() => toggle(false), [toggle]);

  return {
    state,
    toggle,
    setTrue,
    setFalse,
  };
};

export default useBoolean;
