import { isArray, isPlanObject, isSet, isMap } from '@planjs/utils';

function merge<T>(a: any, b: any): T {
  if (isArray(a) && isArray(b)) {
    return [...a, ...b] as unknown as T;
  }
  if (isPlanObject(a) && isPlanObject(b)) {
    return {
      ...a,
      ...b,
    } as T;
  }
  if (isMap(a) && isMap(b)) {
    return new Map([...a, ...b]) as unknown as T;
  }
  if (isSet(a) && isSet(b)) {
    return new Set([...a, ...b]) as unknown as T;
  }
  return a;
}

export default merge;
