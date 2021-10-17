import React from 'react';

import useSafeState from '../../hooks/useSafeState';
import renderChildren from '../../utils/renderChildren';
import isReactKey from '../../utils/isReactKey';

export type WrapperRefObject = {
  /**
   * 增加组件,如果props含有key，则是更新
   * @param com
   * @param props
   * @return index 当前组件所在下标
   */
  add: (com: any, props?: any) => number;
  /**
   * 根据指定下标更新组件
   * @param index
   * @param props
   */
  update: (index: number, props?: any) => void;
  /**
   * 根据指定下标删除组件
   * @param index
   */
  del: (index: number) => any;
  /**
   * 清理所有组件
   */
  clear: () => void;
};

const Wrapper = React.forwardRef<WrapperRefObject>((_, ref) => {
  const [list, setList] = useSafeState<[React.ComponentType<any>, any][]>([]);

  React.useImperativeHandle<any, WrapperRefObject>(ref, () => ({
    add: (content: any, props) => {
      // has key update
      if (isReactKey(props?.key)) {
        const index = list.findIndex((v) => v[1]?.key === props?.key);
        if (~index) {
          list[index][1] = props;
          setList(list.slice());
          return index;
        }
      }
      // add com
      const id = list.push([
        content,
        {
          key: list.length,
          ...props,
        },
      ]);
      setList(list.slice());
      return id - 1;
    },
    del: (index: number) => {
      const com = list.splice(index, 1);
      setList(list.slice());
      return com;
    },
    clear: () => {
      setList(list);
    },
    update(index: number, props: any) {
      if (list[index]) {
        list[index][1] = props;
        setList(list.slice());
      } else {
        console.warn(`Can't find this key "${index}"`);
      }
    },
  }));

  return <>{list.map(([v, props]) => renderChildren(v, props))}</>;
});

export default Wrapper;
