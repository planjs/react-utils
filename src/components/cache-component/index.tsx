import React from 'react';
import ReactDOM from 'react-dom';

import useCreation from '../../hooks/useCreation';

export type CacheComponentProps = React.PropsWithChildren<{
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
}>;

function CacheComponent(props: CacheComponentProps) {
  const { getContainer = () => document.body, shouldUpdate = () => true, children } = props;
  const elRef = React.useRef<HTMLDivElement>(null);

  const [container] = React.useState(getContainer);
  const hasUpdate = shouldUpdate();

  React.useLayoutEffect(() => {
    moveChildNode(container, elRef.current!);
    return () => {
      moveChildNode(elRef.current!, container, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // render children
  useCreation(() => {
    const hasChildren = !!container.childNodes.length;
    if (hasUpdate) {
      ReactDOM.unmountComponentAtNode(container);
    }
    if (!hasUpdate && hasChildren) {
      return;
    }
    ReactDOM.render(children! as React.ReactElement, container, () => {
      moveChildNode(container, elRef.current!);
    });
  }, [container, children]);

  return <div ref={elRef} />;
}

function moveChildNode(source: Element, target: Element, deepClone = false) {
  if (!source || !target) return;

  source.childNodes.forEach((node) => {
    target.appendChild(deepClone ? node.cloneNode(true) : node);
  });
}

export default CacheComponent;
