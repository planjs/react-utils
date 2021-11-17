import React from 'react';
import { isNumber, isString } from '@planjs/utils';

/**
 * check is react valid key
 * @param key
 */
function isReactKey(key: any): key is React.Key {
  return isString(key) || isNumber(key);
}

export default isReactKey;
