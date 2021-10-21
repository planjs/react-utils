import React from 'react';
import ReactDOM from 'react-dom';

export type CacheComponentDOMProps = React.PropsWithChildren<{
  /**
   * 渲染的位置
   * @default () => document.body
   */
  getContainer?: () => Element;
  /**
   * 是否需要更新
   * @default () => true
   */
  shouldUpdate?: () => boolean;
  /**
   * 外层包裹html tag
   * @default div
   */
  containerHTMLTag?: keyof React.ReactHTML;
  /**
   * 包裹元素props
   */
  containerHTMLProps?: React.HTMLAttributes<any>;
}>;

/**
 * 缓存组件产生的DOM，卸载的时候会保存到外部元素内，再显示的时候会移动回组件位置
 * @param props
 * @constructor
 */
function CacheComponentDOM(props: CacheComponentDOMProps) {
  const {
    getContainer = () => document.body,
    shouldUpdate = () => true,
    containerHTMLTag = 'div',
    containerHTMLProps,
    children,
  } = props;
  const elRef = React.useRef<HTMLDivElement>(null);

  const [container] = React.useState(getContainer);
  const hasUpdate = shouldUpdate();

  const divRef = React.useRef(document.createElement('div'));

  React.useLayoutEffect(
    () => {
      moveChildNode(container, elRef.current!);
      ReactDOM.render(children as React.ReactElement, divRef.current, () => {
        elRef.current!.innerHTML = divRef.current.innerHTML;
      });
      return () => {
        container.innerHTML = '';
        moveChildNode(elRef.current!, container);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    hasUpdate ? [children] : [],
  );

  return React.createElement(containerHTMLTag, {
    ...containerHTMLProps,
    ref: elRef,
  });
}

function moveChildNode(source: Element, target: Element, deepClone = false) {
  if (!source || !target) return;

  const len = source.childElementCount;
  let index = len - 1;
  while (index >= 0) {
    const node = source.childNodes[index];
    target.appendChild(deepClone ? node.cloneNode(true) : node);
    index--;
  }
}

export default CacheComponentDOM;
