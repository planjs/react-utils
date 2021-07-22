import { useState, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useMountedState from './useMountedState';

function useSafeState<S = undefined>(
  initialState: S | (() => S),
): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const mountedState = useMountedState();
  const [state, setState] = useState<S>(initialState);
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
