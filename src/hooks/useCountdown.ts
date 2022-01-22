import { useRef, useEffect } from 'react';
import { toDate } from '@planjs/utils';
import type { DateInput } from '@planjs/utils/typings/date/to-date';

import useInterval from './useInterval';
import useSafeState from './useSafeState';

type CountdownOptions = {
  interval?: number;
  onDown?: Function;
  onEnd?: Function;
  /**
   * execute immediately
   */
  startImmediate?: boolean;
};

/**
 * useCountdown
 * @param endTime Time to countdown, if no endTime is passed in, startImmediate defaults to false
 * @param options  Countdown options
 */
function useCountdown(
  endTime?: DateInput,
  options: CountdownOptions = {},
): [number, (endTime?: DateInput) => void, ReturnType<typeof useInterval>] {
  const endTimeRef = useRef(toDate(endTime || new Date()));
  const _endTime = endTimeRef.current!;
  const { interval = 1_000, onDown, onEnd, startImmediate = endTime !== undefined } = options;
  const [time, setTime] = useSafeState<Date>(() => new Date());
  const restTime = _endTime.getTime() - time.getTime();
  const count = restTime > 0 ? Math.ceil(restTime / interval) : 0;

  useEffect(() => {
    if (endTime !== undefined) {
      endTimeRef.current = toDate(endTime);
    }
  }, [endTime]);

  const useIntervalRes = useInterval(onTick, count ? interval : null, startImmediate);

  return [count, handleRestart, useIntervalRes];

  function handleRestart(endTime?: DateInput) {
    endTimeRef.current = toDate(endTime || new Date());
    setTime(new Date());
    useIntervalRes.start();
  }

  function onTick() {
    const newTime = new Date();
    if (newTime > _endTime) {
      if (onEnd) {
        onEnd(newTime);
      }
      setTime(_endTime);

      return;
    }

    if (onDown) {
      onDown(restTime, newTime);
    }
    setTime(newTime);
  }
}

export default useCountdown;
