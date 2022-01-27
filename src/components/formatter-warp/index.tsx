import React from 'react';

export type FormatterWarpProps<I = any, O = any> = React.PropsWithChildren<{
  /**
   * 以下两个属性不要传入
   */
  value?: I;
  onChange?: (...args: any[]) => void;

  /**
   * 自定义绑定值的propName
   * @default value
   */
  valuePropName?: string;

  /**
   * 传入数据转换
   * @param value
   */
  inputFormatter?: (value: O) => I;

  /**
   * 传出数据转换
   * @param value
   */
  outputFormatter?: (...args: any[]) => O;
}>;

/**
 * 外层无侵入改变form表单数据
 * @param props
 * @constructor
 */
function FormatterWarp<I, O>(props: FormatterWarpProps<I, O>) {
  const {
    children,
    inputFormatter,
    outputFormatter,
    onChange,
    valuePropName = 'value',
    value,
    ...p
  } = props;

  if (!children || !React.isValidElement(children)) return null;

  const val = (props as any)[valuePropName];
  return React.cloneElement(children as any, {
    ...p,
    [valuePropName]: inputFormatter ? inputFormatter(val) : val,
    onChange(...args: any[]) {
      if (onChange) {
        outputFormatter ? onChange(outputFormatter(...args)) : onChange(...args);
      }
    },
  });
}

FormatterWarp.toArrayProps = {
  inputFormatter(val: any[]) {
    return val?.[0];
  },
  outputFormatter(val: any) {
    return [val].filter(Boolean);
  },
};

export default FormatterWarp;
