import { useRef, useEffect } from 'react';

function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: Function,
  element = window,
) {
  const savedHandler = useRef<any>(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event: WindowEventMap[K]) => savedHandler.current!(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

export default useEventListener;
