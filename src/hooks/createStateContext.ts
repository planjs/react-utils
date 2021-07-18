import { createElement, createContext, useContext, useState } from 'react';
import type { Dispatch, SetStateAction, FC, ReactNode } from 'react';

const createStateContext = <T>(defaultInitialValue: T) => {
  const context = createContext<[T, Dispatch<SetStateAction<T>>] | undefined>(undefined);
  const providerFactory = (props: any, children: ReactNode) =>
    createElement(context.Provider, props, children);

  const StateProvider: FC<{ initialValue?: T }> = ({ children, initialValue }) => {
    const state = useState<T>(initialValue !== undefined ? initialValue : defaultInitialValue);
    return providerFactory({ value: state }, children);
  };

  const useStateContext = () => {
    const state = useContext(context);
    if (state == null) {
      throw new Error('useStateContext must be used inside a StateProvider.');
    }
    return state;
  };

  return [useStateContext, StateProvider, context] as const;
};

export default createStateContext;
