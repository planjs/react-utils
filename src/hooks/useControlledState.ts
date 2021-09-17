import React from 'react';

type DefaultState<T> = T | (() => T);

/**
 * 控制state
 * @param defaultStateValue {DefaultState} 初始化状态优先级低于 option.defaultValue
 * @param option
 * @param option.defaultValue {DefaultState} 初始化状态
 * @param option.value 使用传入state
 * @param option.onChange 状态变更触发
 * @param option.postState 外部处理完状态作为返回的state
 */
function useControlledState<T, R = T>(
  defaultStateValue: DefaultState<T>,
  option?: {
    defaultValue?: DefaultState<T>;
    value?: T;
    onChange?: (value: T, prevValue: T) => void;
    postState?: (value: T) => T;
  },
): [R, (value: T) => void] {
  const { defaultValue, value, onChange, postState } = option || {};
  const [innerValue, setInnerValue] = React.useState<T>(() => {
    if (value !== undefined) {
      return value;
    }
    if (defaultValue !== undefined) {
      return typeof defaultValue === 'function' ? (defaultValue as any)() : defaultValue;
    }
    return typeof defaultStateValue === 'function'
      ? (defaultStateValue as any)()
      : defaultStateValue;
  });

  let mergedValue = value !== undefined ? value : innerValue;
  if (postState) {
    mergedValue = postState(mergedValue);
  }

  function triggerChange(newValue: T) {
    setInnerValue(newValue);
    if (mergedValue !== newValue && onChange) {
      onChange(newValue, mergedValue);
    }
  }

  const firstRenderRef = React.useRef(true);
  React.useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    if (value === undefined) {
      setInnerValue(value as T);
    }
  }, [value]);

  return [mergedValue as unknown as R, triggerChange];
}

export default useControlledState;
