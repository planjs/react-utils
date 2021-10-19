import React from 'react';
import { isFunction } from '@planjs/utils';

type ChildrenType<P = any> =
  | React.ComponentClass<P>
  | React.ReactNode
  | React.ReactElement<P>
  | React.FC<any>;

/**
 * 渲染 react 子节点
 * @param Children
 * @param props
 */
function renderChildren(Children: ChildrenType, props?: any): React.ReactElement | null {
  if (React.isValidElement(Children)) {
    return Children;
  }
  if (isFunction(Children)) {
    // @ts-ignore
    return <Children {...props} />;
  }
  return null;
}

export default renderChildren;
