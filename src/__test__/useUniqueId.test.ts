import { renderHook, act } from '@testing-library/react-hooks';
import { useUniqueId } from '../index';

const setUp = () => renderHook(() => useUniqueId());

describe('useUniqueId', () => {
  const ids: number[] = [];

  it('test unique', () => {
    const { result, rerender } = setUp();

    for (let i = 0; i < 100; i++) {
      act(rerender);
      const current = result.current;
      if (!ids.includes(current)) {
        ids.push(current);
      }
      expect(ids.length - 1).toEqual(i);
    }
  });
});
