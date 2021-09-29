import { useState, useCallback } from 'react';
import type { SetStateAction } from 'react';

import merge from '../utils/merge';
import getActionState from '../utils/getActionState';

type SetMergeStateOptions = {
  /**
   * 跳过merge直接设置状态
   */
  skipMerge?: boolean;
};

/**
 * 使用合并state hook
 * 仅支持合并 object array Map Set
 * @param initialState
 */
function useMergeState<S>(initialState: S | (() => S)) {
  const [state, setState] = useState<S>(initialState);

  const setMergeState = useCallback((value: SetStateAction<S>, options?: SetMergeStateOptions) => {
    const { skipMerge = false } = options || {};
    if (!skipMerge) {
      setState((previousState: S) => {
        return merge(previousState, getActionState(value, previousState));
      });
    } else {
      setState(value);
    }
  }, []);

  return [state, setMergeState];
}

export default useMergeState;
