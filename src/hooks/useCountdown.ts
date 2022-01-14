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
 * @param endTime Time to countdown
 * @param options  Countdown options
 */
function useCountdown(
  endTime: DateInput,
  options: CountdownOptions = {},
): [number, ReturnType<typeof useInterval>] {
  const _endTime = toDate(endTime);
  const { interval = 1_000, onDown, onEnd, startImmediate = true } = options;
  const [time, setTime] = useSafeState<Date>(() => new Date());
  const restTime = _endTime.getTime() - time.getTime();
  const count = restTime > 0 ? Math.ceil(restTime / interval) : 0;

  const useIntervalRes = useInterval(onTick, count ? interval : null, startImmediate);

  return [count, useIntervalRes];

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
