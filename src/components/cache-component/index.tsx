import React from 'react';
import ReactDOM from 'react-dom';

import { useCreation } from '../../hooks';

export type CacheComponentProps = React.PropsWithChildren<{
  /**
   * 渲染的位置
   * @default () => document.body
   */
  getContainer?: () => Element;
}>;

function CacheComponent(props: CacheComponentProps) {
  const { getContainer = () => document.body, children } = props;
  const elRef = React.useRef<HTMLDivElement>(null);

  const [container] = React.useState(getContainer);

  React.useLayoutEffect(() => {
    return () => {
      try {
        if (elRef.current) {
          elRef.current!.childNodes.forEach((node) => {
            container.appendChild(node.cloneNode(true));
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // render children
  useCreation(() => {
    const hasChildren = !!container.childNodes.length;
    if (!hasChildren) {
      ReactDOM.render(children! as React.ReactElement, container, () => {
        if (elRef.current) {
          container.childNodes.forEach((node) => {
            elRef.current!.appendChild(node);
          });
        }
      });
    }
  }, [container]);

  return <div ref={elRef} />;
}

export default CacheComponent;
