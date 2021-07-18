import { useCallback, useState } from 'react';

const useForceUpdate = (): (() => void) => {
  const [, dispatch] = useState<{}>(Object.create(null));

  return useCallback((): void => {
    dispatch(Object.create(null));
  }, [dispatch]);
};

export default useForceUpdate;
