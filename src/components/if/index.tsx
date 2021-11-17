import React from 'react';
import { isFunction } from '@planjs/utils';

export type IfProps = {
  condition?: (() => boolean) | boolean;
  render?: () => React.ReactNode | undefined | null;
};

const If: React.FC<IfProps> = (props) => {
  let condition = !!props.condition;
  if (props.condition && isFunction(props.condition)) {
    condition = props.condition();
  }
  return condition
    ? ((props.render ? props.render() : props.children) as React.ReactElement)
    : null;
};

export default If;
