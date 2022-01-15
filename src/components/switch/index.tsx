import React from 'react';

import If from '../if';
import type { IfProps } from '../if';

type SwitchProps = {
  value?: any;
  children?: React.ReactElement<CaseProps | DefaultProps>[];
};

type DefaultProps = Omit<IfProps, 'condition'>;

type CaseProps = DefaultProps & { condition: any };

const Switch = (props: SwitchProps) => {
  let c: React.ReactNode = null;
  let d: React.ReactNode = null;

  React.Children.forEach(props.children, (children) => {
    if (children) {
      const _props = children.props as IfProps;
      if (_props.condition === undefined) {
        d = React.cloneElement(children, {
          condition: true,
        });
      } else if (_props.condition === props.value) {
        c = React.cloneElement(children, {
          condition: true,
        });
        return;
      }
    }
  });

  return c || d;
};

Switch.Case = If as React.FC<CaseProps>;
Switch.Default = If as React.FC<DefaultProps>;

export default Switch;
