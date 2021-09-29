import { isFunction } from '@planjs/utils';
import { SetStateAction } from 'react';

function getActionState<V>(value: SetStateAction<V>, args: V): V {
  return isFunction(value) ? value(args) : (value as V);
}

export default getActionState;
