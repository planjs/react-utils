import useCreation from './useCreation';
import { useState, useMemo } from 'react';

interface Options {
  min?: number;
  max?: number;
}

interface Actions {
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  set: (value: number | ((c: number) => number)) => void;
  reset: () => void;
}

function useCounter(initialValue: number = 0, options: Options = {}): [number, Actions] {
  const { min, max } = options;
  const init = useCreation(() => {
    if (typeof max === 'number') {
      return Math.min(max, initialValue);
    }
    if (typeof min === 'number') {
      return Math.max(min, initialValue);
    }
    return initialValue;
  }, []);

  const [current, setCurrent] = useState(init);
  const actions = useMemo(() => {
    const setValue = (value: number | ((c: number) => number)) => {
      setCurrent((c: number) => {
        // get target value
        let target = typeof value === 'number' ? value : value(c);
        if (typeof max === 'number') {
          target = Math.min(max, target);
        }
        if (typeof min === 'number') {
          target = Math.max(min, target);
        }
        return target;
      });
    };
    const inc = (delta: number = 1) => {
      setValue(c => c + delta);
    };
    const dec = (delta: number = 1) => {
      setValue(c => c - delta);
    };
    const set = (value: number | ((c: number) => number)) => {
      setValue(value);
    };
    const reset = () => {
      setValue(init);
    };
    return { inc, dec, set, reset };
  }, [init, max, min]);

  return [current, actions];
}

export default useCounter;
