import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { isFunction } from '@planjs/utils';

export type AsyncWrapProps = {
  delay?: number;
  loaded?: (() => Promise<unknown>) | Promise<unknown>;
  fallback: NonNullable<ReactNode> | null;
};

const AsyncWrap: React.FC<AsyncWrapProps> = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (props.loaded!) {
      Promise.resolve(isFunction(props.loaded) ? props.loaded() : props.loaded).finally(() => {
        timer = setTimeout(() => setLoading(false), props.delay || 0);
      });
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [props]);

  return <>{loading ? props.fallback : props.children!}</>;
};

export default AsyncWrap;
