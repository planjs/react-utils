import React from 'react';

import { until } from '@planjs/utils';

import type { BaseRetryOption } from '@planjs/utils/typings/promise/type';
import type { ThenReturn } from '@planjs/utils/typings/type';

function useUntil<T extends (...args: any[]) => Promise<any>>(fn: T, options: BaseRetryOption) {
  const isRunning = React.useRef(false);
  const forceStop = React.useRef(false);

  const forceStopCallback = React.useRef<(val?: any) => void>();

  const [result, setResult] = React.useState<ThenReturn<T>>();
  const [err, setErr] = React.useState<Error | undefined>();

  const action = React.useRef(
    until(async (...props: Parameters<T>[]) => {
      if (forceStop.current) {
        forceStopCallback.current && forceStopCallback.current();
        return forceStop.current;
      }
      try {
        setErr(undefined);
        // eslint-disable-next-line prefer-spread
        const res = await fn.apply(null, props);
        setResult(res);
      } catch (error) {
        setErr(error as Error);
      }
    }, options),
  );

  const cancel = React.useCallback(() => {
    forceStop.current = true;
    return new Promise((resolve) => {
      if (isRunning.current) {
        forceStopCallback.current = resolve;
      } else {
        resolve(true);
      }
    })
      .then(() => (forceStop.current = false))
      .then(() => (isRunning.current = false));
  }, []);

  const run = React.useCallback(
    async (...props: Parameters<T>) => {
      if (isRunning.current) {
        await cancel();
      }
      isRunning.current = true;
      return action.current.apply(null, props);
    },
    [cancel, action],
  ) as T;

  return { result, run, cancel, isRunning, err };
}

export default useUntil;
