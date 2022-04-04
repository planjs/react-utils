import { useMemo } from 'react';
import { incrementId } from '@planjs/utils';

import type { DependencyList } from 'react';

const gen = incrementId();

function useUniqueId(deps?: DependencyList) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => gen(), deps);
}

export default useUniqueId;
