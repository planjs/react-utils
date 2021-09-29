import { isArray, isPlanObject, isSet, isMap } from '@planjs/utils';

function merge<T>(a: any, b: any): T {
  if (isArray(a) && isArray(b)) {
    return [...a, ...b] as unknown as T;
  } else if (isPlanObject(a) && isPlanObject(b)) {
    return {
      ...a,
      ...b,
    } as T;
  } else if (isMap(a) && isMap(b)) {
    return new Map([...a, ...b]) as unknown as T;
  } else if (isSet(a) && isSet(b)) {
    return new Set([...a, ...b]) as unknown as T;
  } else {
    return a;
  }
}

export default merge;
