import React from 'react';
import { isFunction } from '@planjs/utils';

/**
 * 判断是否 react ClassComponent
 * @param component
 */
function isClassComponent(component: any): component is React.Component<any> {
  return isFunction(component) && component.prototype && !!component.prototype.isReactComponent;
}

export default isClassComponent;
