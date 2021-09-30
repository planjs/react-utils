import { renderHook, act } from '@testing-library/react-hooks';
import { useBoolean } from '../index';

const setUp = (defaultValue?: boolean) => renderHook(() => useBoolean(defaultValue));

describe('useBoolean', () => {
  it('test methods', async () => {
    const { result } = setUp();
    expect(result.current.state).toBeFalsy();
    act(() => {
      result.current.setTrue();
    });
    expect(result.current.state).toBeTruthy();
    act(() => {
      result.current.setFalse();
    });
    expect(result.current.state).toBeFalsy();
    act(() => {
      result.current.toggle();
    });
    expect(result.current.state).toBeTruthy();
    act(() => {
      result.current.toggle();
    });
    expect(result.current.state).toBeFalsy();
    act(() => {
      result.current.toggle(false);
    });
    expect(result.current.state).toBeFalsy();
    act(() => {
      result.current.toggle(true);
    });
    expect(result.current.state).toBeTruthy();
  });

  it('test default value', () => {
    const hook = setUp(true);
    expect(hook.result.current.state).toBeTruthy();
  });
});
