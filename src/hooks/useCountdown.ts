import { toDate } from '@planjs/utils';
import type { DateInput } from '@planjs/utils/typings/date/to-date';

import useInterval from './useInterval';
import useSafeState from './useSafeState';

type CountdownOptions = {
  interval?: number;
  onDown?: Function;
  onEnd?: Function;
};

/**
 * useCountdown
 * @param endTime Time to countdown
 * @param options  Countdown options
 */
function useCountdown(endTime: DateInput, options: CountdownOptions = {}): number {
  const _endTime = toDate(endTime);
  const { interval = 1_000, onDown, onEnd } = options;
  const [time, setTime] = useSafeState<Date>(() => new Date());
  const restTime = _endTime.getTime() - time.getTime();
  const count = restTime > 0 ? Math.ceil(restTime / interval) : 0;

  useInterval(onTick, count ? interval : null, true);

  return count;

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
