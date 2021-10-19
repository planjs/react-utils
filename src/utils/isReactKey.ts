import React from 'react';
import { isNumber, isString } from '@planjs/utils';

function isReactKey(key: any): key is React.Key {
  return isString(key) || isNumber(key);
}

export default isReactKey;
