import { DependencyList, useEffect } from 'react';
import useAsyncFn from './useAsyncFn';
import { FnReturningPromise } from './typings';

export type { AsyncState, AsyncFnReturn } from './useAsyncFn';

export default function useAsync<T extends FnReturningPromise>(fn: T, deps: DependencyList = []) {
  const [state, callback] = useAsyncFn(fn, deps, {
    loading: true,
  });

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
}
