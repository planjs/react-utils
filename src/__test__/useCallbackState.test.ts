import { renderHook, act } from '@testing-library/react-hooks';
import { useCallbackState } from '../index';

const setUp = <T>(defaultValue?: T) => renderHook(() => useCallbackState(defaultValue));

describe('useCallbackState', () => {
  it('test callback', () => {
    const { result } = setUp(true);
    const [value, setValue, getValue] = result.current;
    act(() => {
      setValue(false, (res) => {
        expect(value).toBe(true);
        expect(res).toBe(false);
      });
    });
    expect(value).toBe(true);
    expect(getValue()).toBe(false);
  });
});
