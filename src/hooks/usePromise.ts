import { useCallback } from 'react';
import useMountedState from './useMountedState';

export type UsePromise = () => <T>(promise: Promise<T>) => Promise<T>;

/**
 * 包裹promise，组件卸载阻止更新视图
 */
const usePromise: UsePromise = () => {
  const isMounted = useMountedState();
  return useCallback(
    (promise: Promise<any>) =>
      new Promise<any>((resolve, reject) => {
        const onValue = (value: any) => {
          isMounted() && resolve(value);
        };
        const onError = (error: any) => {
          isMounted() && reject(error);
        };
        promise.then(onValue, onError);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};

export default usePromise;
