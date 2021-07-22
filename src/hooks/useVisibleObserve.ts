import { useState, useEffect } from 'react';

/**
 * 监听元素是否可见的抽象类
 */
abstract class AVisibleObserve {
  /**
   * 监听元素的 DOM ID
   */
  protected targetDomId: string;

  /**
   * 可见范围根节点 DOM ID
   */
  protected rootDomId: string;

  /**
   * Active 变化回调
   */
  protected onActiveChange: (active?: boolean) => void;

  protected constructor(
    targetDomId: string,
    rootDomId: string,
    onActiveChange: (active?: boolean) => void,
  ) {
    this.targetDomId = targetDomId;
    this.rootDomId = rootDomId;
    this.onActiveChange = onActiveChange;
  }

  /**
   * 开始监听
   */
  abstract observe(): void;

  /**
   * 取消监听
   */
  abstract unobserve(): void;
}

class IntersectionVisibleObserve extends AVisibleObserve {
  /**
   * IntersectionObserver 实例
   */
  private intersectionObserver: IntersectionObserver;

  constructor(targetDomId: string, rootDomId: string, onActiveChange: (active?: boolean) => void) {
    super(targetDomId, rootDomId, onActiveChange);

    this.intersectionObserver = new IntersectionObserver(
      (changes) => {
        if (changes[0].intersectionRatio > 0) {
          onActiveChange(true);
        } else {
          onActiveChange(false);

          // 因为虚拟 dom 更新导致实际 dom 更新，也会在此触发，判断 dom 丢失则重新监听
          if (!document.body.contains(changes[0].target)) {
            this.intersectionObserver.unobserve(changes[0].target);
            this.intersectionObserver.observe(document.getElementById(this.targetDomId)!);
          }
        }
      },
      {
        root: document.getElementById(rootDomId),
      },
    );
  }

  observe() {
    if (document.getElementById(this.targetDomId)) {
      this.intersectionObserver.observe(document.getElementById(this.targetDomId)!);
    }
  }

  unobserve() {
    this.intersectionObserver.disconnect();
  }
}

class SetIntervalVisibleObserve extends AVisibleObserve {
  /**
   * Interval 引用
   */
  private interval: ReturnType<typeof setInterval> | undefined;

  /**
   * 检查是否可见的时间间隔
   */
  private checkInterval = 1000;

  // eslint-disable-next-line
  constructor(targetDomId: string, rootDomId: string, onActiveChange: (active?: boolean) => void) {
    super(targetDomId, rootDomId, onActiveChange);
  }

  /**
   * 判断元素是否可见
   */
  private judgeActive() {
    // 获取 root 组件 rect
    const rootComponentDom = document.getElementById(this.rootDomId);
    if (!rootComponentDom) {
      return;
    }
    // root 组件 rect
    const rootComponentRect = rootComponentDom.getBoundingClientRect();
    // 获取当前组件 rect
    const componentDom = document.getElementById(this.targetDomId);
    if (!componentDom) {
      return;
    }
    // 当前组件 rect
    const componentRect = componentDom.getBoundingClientRect();

    // 判断当前组件是否在 root 组件可视范围内
    // 长度之和
    const sumOfWidth =
      Math.abs(rootComponentRect.left - rootComponentRect.right) +
      Math.abs(componentRect.left - componentRect.right);
    // 宽度之和
    const sumOfHeight =
      Math.abs(rootComponentRect.bottom - rootComponentRect.top) +
      Math.abs(componentRect.bottom - componentRect.top);

    // 长度之和 + 两倍间距（交叉则间距为负）
    const sumOfWidthWithGap = Math.abs(
      rootComponentRect.left + rootComponentRect.right - componentRect.left - componentRect.right,
    );
    // 宽度之和 + 两倍间距（交叉则间距为负）
    const sumOfHeightWithGap = Math.abs(
      rootComponentRect.bottom + rootComponentRect.top - componentRect.bottom - componentRect.top,
    );
    if (sumOfWidthWithGap <= sumOfWidth && sumOfHeightWithGap <= sumOfHeight) {
      // 在内部
      this.onActiveChange(true);
    } else {
      // 在外部
      this.onActiveChange(false);
    }
  }

  observe() {
    // 监听时就判断一次元素是否可见
    this.judgeActive();

    this.interval = setInterval(this.judgeActive, this.checkInterval);
  }

  unobserve() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

/**
 * 监听元素是否可见总类
 */
export class VisibleObserve extends AVisibleObserve {
  /**
   * 实际 VisibleObserve 类
   */
  private actualVisibleObserve: AVisibleObserve | null = null;

  constructor(targetDomId: string, rootDomId: string, onActiveChange: (active?: boolean) => void) {
    super(targetDomId, rootDomId, onActiveChange);

    // 根据浏览器 API 兼容程度选用不同 Observe 方案
    if ('IntersectionObserver' in window) {
      // 最新 IntersectionObserve 方案
      this.actualVisibleObserve = new IntersectionVisibleObserve(
        targetDomId,
        rootDomId,
        onActiveChange,
      );
    } else {
      // 兼容的 SetInterval 方案
      this.actualVisibleObserve = new SetIntervalVisibleObserve(
        targetDomId,
        rootDomId,
        onActiveChange,
      );
    }
  }

  observe() {
    this.actualVisibleObserve!.observe();
  }

  unobserve() {
    this.actualVisibleObserve!.unobserve();
  }
}

export default function useVisibleObserve(domId: string, rootId: string, flag?: any) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const visibleObserve = new VisibleObserve(domId, rootId, (active) => {
      setVisible(!!active);
    });

    visibleObserve.observe();

    return () => visibleObserve.unobserve();
  }, [domId, rootId, flag]);

  return [visible];
}
