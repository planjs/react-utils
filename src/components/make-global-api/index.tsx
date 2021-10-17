import React from 'react';
import ReactDOM from 'react-dom';

import Wrapper from './wrapper';
import type { WrapperRefObject } from './wrapper';

export type MakeGlobalApiOptions<P = any> = {
  /**
   * 渲染的位置
   * @default () => document.body
   */
  getContainer?: () => ReactDOM.Container;
  /**
   * 组件
   */
  children: React.ComponentType<P> | React.ReactNode | React.ElementType;
};

export type MakeGlobalApiReturnType<P = any> = {
  /**
   * 触发会渲染组件，多次触发会多次渲染
   * @param props 传入key的话，不存在则创建，存在则更新
   */
  render: (props?: P) => {
    /**
     * 当前渲染组件下标
     */
    index: number;
    /**
     * 卸载当前组件
     */
    unmount(): void;
    /**
     * 更新当前组件
     * @param props
     */
    update(props?: P): void;
  };
  /**
   * 更新组件，根据 render 返回的 key
   * @param key
   * @param props
   */
  update?: (key: number, props?: P) => void;
  /**
   * 卸载所有组件
   */
  unmountAll: () => void;
  /**
   * 渲染的盒子
   */
  container: ReactDOM.Container;
};

/**
 * 使组件作为全局方法调用
 * @param opts
 */
function makeGlobalApi<P = any>(opts: MakeGlobalApiOptions<P>): MakeGlobalApiReturnType<P> {
  const { getContainer = () => document.body, children } = opts;

  const wrapperRef = React.createRef<WrapperRefObject>();

  const container = getContainer();

  const div = document.createElement('div');
  container.appendChild(div);

  // render wrapper
  ReactDOM.render(<Wrapper ref={wrapperRef} />, div);

  return {
    render(props?: any) {
      const index = wrapperRef.current?.add(children, props)!;
      return {
        index,
        unmount() {
          return wrapperRef.current?.del(index);
        },
        update(props: any) {
          wrapperRef.current?.update(index, props);
        },
      };
    },
    update(key, props?: any) {
      wrapperRef.current?.update(key, props);
    },
    unmountAll() {
      wrapperRef.current?.clear();
    },
    container,
  };
}

export default makeGlobalApi;
