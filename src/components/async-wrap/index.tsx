import React, { useEffect } from 'react';
import type { ReactNode, FC } from 'react';
import { isFunction, prefSetTimeout } from '@planjs/utils';

import useSafeState from '../../hooks/useSafeState';

export type AsyncWrapProps = {
  delay?: number;
  loaded?: (() => Promise<unknown>) | Promise<unknown>;
  fallback?: ReactNode;
};

const AsyncWrap: FC<AsyncWrapProps> = (props) => {
  const [loading, setLoading] = useSafeState(true);

  useEffect(() => {
    const timer = prefSetTimeout(() => {
      if (props.loaded!) {
        Promise.resolve(isFunction(props.loaded) ? props.loaded() : props.loaded).finally(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }, props.delay || 0);

    return () => {
      timer && clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return <>{loading ? props.fallback : props.children!}</>;
};

export default AsyncWrap;
