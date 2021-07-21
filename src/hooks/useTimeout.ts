import useTimeoutFn from './useTimeoutFn';
import useForceUpdate from './useForceUpdate';

export type UseTimeoutReturn = [() => boolean | null, () => void, () => void];

export default function useTimeout(ms: number = 0): UseTimeoutReturn {
  const update = useForceUpdate();

  return useTimeoutFn(update, ms);
}
