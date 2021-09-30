import { renderHook, act } from '@testing-library/react-hooks';
import { useMergeState } from '../index';

const setUp = (defaultValue?: object) => renderHook(() => useMergeState(defaultValue));

describe('useMergeState', () => {
  const { result } = setUp();
  act(() => {
    //
  });
  console.log(result);
});
