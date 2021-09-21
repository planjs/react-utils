import { useCallback } from 'react';
import useToggle from './useToggle';

type BooleanHandlerAsObject = {
  state: boolean;
  toggle: (value?: boolean) => void;
  setTrue: () => void;
  setFalse: () => void;
};

type BooleanHandlerAsArray = Array<
  | boolean
  | BooleanHandlerAsObject['toggle']
  | BooleanHandlerAsObject['setTrue']
  | BooleanHandlerAsObject['setFalse']
> & {
  0: boolean;
  1: BooleanHandlerAsObject['toggle'];
  2: BooleanHandlerAsObject['setTrue'];
  3: BooleanHandlerAsObject['setFalse'];
};

type BooleanHandler = BooleanHandlerAsArray & BooleanHandlerAsObject;

/**
 * 默认切换布尔值状态，也可以接收一个参数作为新的值
 */
const useBoolean = (defaultValue: boolean = false): BooleanHandler => {
  const { state, toggle } = useToggle(defaultValue);

  const setTrue = useCallback(() => toggle(true), [toggle]);

  const setFalse = useCallback(() => toggle(false), [toggle]);

  let handler: unknown;
  (handler as BooleanHandlerAsArray) = [state, toggle, setTrue, setFalse];
  (handler as BooleanHandlerAsObject).state = state;
  (handler as BooleanHandlerAsObject).toggle = toggle;
  (handler as BooleanHandlerAsObject).setTrue = setTrue;
  (handler as BooleanHandlerAsObject).setFalse = setFalse;

  return handler as BooleanHandler;
};

export default useBoolean;
