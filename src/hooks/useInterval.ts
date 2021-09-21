import { useState, useEffect, useRef } from 'react';
import { prefSetInterval, clearPrefSetInterval } from '@planjs/utils';

type IntervalHandlerAsObject = {
  /**
   * Function to start the interval
   */
  start: () => void;
  /**
   * Function to stop the interval
   */
  stop: () => void;
  /**
   * IntervalId of the interval
   */
  intervalId: number | null;
};

type IntervalHandlerAsArray = Array<number | (() => void) | null> & {
  0: () => void;
  1: () => void;
  2: number | null;
};

type IntervalHandler = IntervalHandlerAsArray & {};

/**
 * useInterval
 * @param {Function} callback
 * @param {number} intervalDuration
 * @param {boolean} startImmediate
 * @returns {IntervalHandler} default false
 */
function useInterval(
  callback: () => any,
  intervalDuration: number | null,
  startImmediate: boolean = false,
): IntervalHandler {
  const internalIdRef = useRef<number | null>(null);
  const [isRunning, setIsRunning] = useState(startImmediate);
  const savedCallback = useRef<() => any>();

  function start() {
    if (!isRunning) {
      setIsRunning(true);
    }
  }

  function stop() {
    if (isRunning) {
      setIsRunning(false);
    }
    internalIdRef.current && clearPrefSetInterval(internalIdRef.current);
  }

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (intervalDuration !== null && isRunning) {
      const id = prefSetInterval(tick, intervalDuration);
      internalIdRef.current = id;

      return () => {
        internalIdRef.current = null;
        clearPrefSetInterval(id);
      };
    }
  }, [intervalDuration, isRunning]);

  let handler: unknown;
  (handler as IntervalHandlerAsArray) = [start, stop, internalIdRef.current];
  (handler as IntervalHandlerAsObject).start = start;
  (handler as IntervalHandlerAsObject).stop = stop;
  (handler as IntervalHandlerAsObject).intervalId = internalIdRef.current;

  return handler as IntervalHandlerAsArray & IntervalHandlerAsObject;
}

export default useInterval;
