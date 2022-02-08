import React from 'react';

export type FormatterWrapProps<I = any, O = any> = React.PropsWithChildren<{
  /**
   * 以下两个属性不要传入
   */
  value?: O;
  onChange?: (value: O, ...args: any[]) => void;

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

  /**
   * 获取事件值
   * @param args
   */
  getValueFromEvent?: (...args: any[]) => any;
}>;

/**
 * 外层无侵入改变form表单数据
 * @param props
 * @constructor
 */
function FormatterWrap<I, O>(props: FormatterWrapProps<I, O>) {
  const {
    children,
    inputFormatter,
    outputFormatter,
    onChange,
    valuePropName = 'value',
    value,
    getValueFromEvent,
    ...p
  } = props;

  if (!children || !React.isValidElement(children)) return null;

  const val = (props as any)[valuePropName];
  return React.cloneElement(children as any, {
    ...p,
    [valuePropName]: inputFormatter ? inputFormatter(val) : val,
    onChange(...args: any[]) {
      if (onChange) {
        let newValue: any;
        if (getValueFromEvent) {
          newValue = getValueFromEvent(...args);
        } else {
          newValue = defaultGetValueFromEvent(valuePropName, ...args);
        }
        outputFormatter
          ? onChange(outputFormatter(newValue, ...args?.slice(1)))
          : onChange(newValue, ...args?.slice(1));
      }
    },
  });
}

function defaultGetValueFromEvent(valuePropName: string, ...args: any[]) {
  const event = args?.[0];
  if (event && event.target && typeof event.target === 'object' && valuePropName in event.target) {
    // @ts-ignore
    return (event.target as HTMLInputElement)[valuePropName];
  }

  return event;
}

export default FormatterWrap;
