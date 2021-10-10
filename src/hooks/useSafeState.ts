import { useState, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useMountedState from './useMountedState';

/**
 * 同 useState 一样使用，组件卸载会阻止 setState
 * @param initialState
 */
function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
function useSafeState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
function useSafeState<S>(initialState?: S | (() => S)) {
  const mountedState = useMountedState();
  const [state, setState] = useState<S>(initialState!);
  const setCurrentState = useCallback(
    (currentState) => {
      if (!mountedState()) return;
      setState(currentState);
    },
    [mountedState],
  );

  return [state, setCurrentState];
}

export default useSafeState;
