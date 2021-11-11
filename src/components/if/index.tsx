import React from 'react';
import { isFunction } from '@planjs/utils';

export type IfProps = React.PropsWithChildren<{
  condition?: (() => boolean) | boolean;
  render?: () => React.ReactNode;
}>;

const If = (props: IfProps) => {
  let condition = props.condition;
  if (props.condition && isFunction(props.condition)) {
    condition = props.condition();
  }
  return condition ? (props.render ? props.render() : props.children) : null;
};

export default If;
