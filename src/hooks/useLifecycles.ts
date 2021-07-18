import { useEffect } from 'react';

const useLifecycles = (mount: () => void, unmount?:() => void) => {
  useEffect(() => {
    if (mount) {
      mount();
    }
    return () => {
      if (unmount) {
        unmount();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useLifecycles;
