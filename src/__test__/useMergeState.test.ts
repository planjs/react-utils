import { renderHook, act } from '@testing-library/react-hooks';
import { useMergeState } from '../index';

const setUp = <T>(defaultValue?: T) => renderHook(() => useMergeState(defaultValue));

describe('useMergeState', () => {
  it('test object', () => {
    const { result } = setUp<Record<string, number>>({ a: 1 });
    const [, setValue] = result.current;
    act(() => {
      setValue({ b: 1 });
    });
    expect(result.current[0]).toEqual({
      a: 1,
      b: 1,
    });

    act(() => {
      setValue({ a: 1 }, { skipMerge: true });
    });
    expect(result.current[0]).toEqual({
      a: 1,
    });

    act(() => {
      setValue(() => ({ b: 1 }));
    });
    expect(result.current[0]).toEqual({
      a: 1,
      b: 1,
    });
  });

  it('test array', () => {
    const { result } = setUp<number[]>([1]);
    const [, setValue] = result.current;
    act(() => {
      setValue([2]);
    });
    expect(result.current[0]).toEqual([1, 2]);

    act(() => {
      setValue([1], { skipMerge: true });
    });
    expect(result.current[0]).toEqual([1]);

    act(() => {
      setValue(() => [2]);
    });
    expect(result.current[0]).toEqual([1, 2]);
  });
});
