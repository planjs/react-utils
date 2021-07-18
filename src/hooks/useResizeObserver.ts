import { useRef, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export default function useResizeObserver(handler: (evt: any) => void, element?: HTMLElement) {
  // 创建一个 ref 来存储处理程序
  const saveHandler = useRef<(evt: any) => void>();

  // 如果 handler 变化了，就更新 ref.current 的值。
  // 这个让我们下面的 effect 永远获取到最新的 handler
  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      if (!element) return;

      // 创建事件监听调用存储在 ref 的处理方法
      const eventListener = (event: any) => saveHandler.current!(event);
      // 添加事件监听
      const observer = new ResizeObserver(eventListener);
      element && observer.observe(element);

      // 清除的时候移除事件监听
      return () => {
        element && observer.unobserve(element);
      };
    },
    [element] // 如果 element 变化，就再次运行
  );
}
