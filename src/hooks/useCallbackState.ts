import { useState, useEffect, useRef, useCallback } from 'react';
import type { SetStateAction } from 'react';

type Dispatch<A, V> = (value: A, callback?: (value: V) => void) => void;

/**
 * setState callback new val
 * @param initialState
 * @return [state, setStateWithCallback, getState]
 */
function useCallbackState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>, S>, () => S];
function useCallbackState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>, S | undefined>,
  () => S | undefined,
];
function useCallbackState<S>(initialState?: S | (() => S)) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef<(value: S) => void>();

  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    cbRef.current?.(state!);
  }, [state]);

  const getState = useCallback(() => stateRef.current, []);

  const _setState = useCallback((value: S, cb?: (value: S) => void) => {
    setState(value);
    cbRef.current = cb;
  }, []);

  return [state, _setState, getState];
}

export default useCallbackState;
