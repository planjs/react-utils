import { useState, useEffect, useRef } from 'react';
import type { SetStateAction } from 'react';

type Dispatch<A, V> = (value: A, callback?: (value: V) => void) => void;

/**
 * setState callback new val
 * @param initialState
 */
function useCallbackState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>, S>];
function useCallbackState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>, S | undefined>,
];
function useCallbackState<S>(initialState?: S | (() => S)) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef<(value: S) => void>();

  useEffect(() => {
    cbRef.current?.(state!);
  }, [state]);

  return [
    state,
    function (value: S, cb?: (value: S) => void) {
      setState(value);
      cbRef.current = cb;
    },
  ];
}

export default useCallbackState;
