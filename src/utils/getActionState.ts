import { SetStateAction } from 'react';
import { isFunction } from '@planjs/utils';

function getActionState<V>(value: SetStateAction<V>, args: V): V {
  return isFunction(value) ? value(args) : (value as V);
}

export default getActionState;
