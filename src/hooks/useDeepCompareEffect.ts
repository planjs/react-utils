import React, { EffectCallback, DependencyList } from 'react';
import { isPrimitive } from '@planjs/utils';

import useDeepCompareMemoize from './useDeepCompareMemoize';

type UseEffectReturn = ReturnType<typeof React.useEffect>;

function checkDeps(deps: DependencyList) {
  if (!deps || !deps.length) {
    throw new Error(
      'useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.',
    );
  }
  if (deps.every(isPrimitive)) {
    throw new Error(
      'useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
    );
  }
}

/**
 * 会浅比较 dependencies 的值，减少更新次数
 * @param callback
 * @param dependencies
 */
function useDeepCompareEffect(
  callback: EffectCallback,
  dependencies: DependencyList,
): UseEffectReturn {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(dependencies);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useEffect(callback, useDeepCompareMemoize(dependencies));
}

export default useDeepCompareEffect;
