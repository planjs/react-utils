import { useCallback, useRef, useState } from 'react';

const useList = <T>(initialList: T[] = []) => {
  const counterRef = useRef(-1);

  const keyList = useRef<number[]>([]);

  const setKey = useCallback((index: number) => {
    counterRef.current += 1;
    keyList.current.splice(index, 0, counterRef.current);
  }, []);

  const [list, setList] = useState(() => {
    initialList.forEach((_, index) => {
      setKey(index);
    });
    return initialList;
  });

  const resetList = useCallback((newList: T[]) => {
    keyList.current = [];
    setList(() => {
      newList.forEach((_, index) => {
        setKey(index);
      });
      return newList;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const insert = useCallback((index: number, item: T) => {
    setList((l) => {
      const temp = [...l];
      temp.splice(index, 0, item);
      setKey(index);
      return temp;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getKey = useCallback((index: number) => keyList.current[index], []);

  const getIndex = useCallback(
    (key: number) => keyList.current.findIndex((ele) => ele === key),
    [],
  );

  const merge = useCallback((index: number, items: T[]) => {
    setList((l) => {
      const temp = [...l];
      items.forEach((_, i) => {
        setKey(index + i);
      });
      temp.splice(index, 0, ...items);
      return temp;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const replace = useCallback((index: number, item: T) => {
    setList((l) => {
      const temp = [...l];
      temp[index] = item;
      return temp;
    });
  }, []);

  const remove = useCallback((index: number) => {
    setList((l) => {
      const temp = [...l];
      temp.splice(index, 1);

      try {
        keyList.current.splice(index, 1);
      } catch (e) {
        console.error(e);
      }
      return temp;
    });
  }, []);

  const move = useCallback((oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) {
      return;
    }
    setList((l) => {
      const newList = [...l];
      const temp = newList.filter((_, index: number) => index !== oldIndex);
      temp.splice(newIndex, 0, newList[oldIndex]);

      // move keys if necessary
      try {
        const keyTemp = keyList.current.filter((_, index: number) => index !== oldIndex);
        keyTemp.splice(newIndex, 0, keyList.current[oldIndex]);
        keyList.current = keyTemp;
      } catch (e) {
        console.error(e);
      }

      return temp;
    });
  }, []);

  const push = useCallback((item: T) => {
    setList((l) => {
      setKey(l.length);
      return l.concat([item]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pop = useCallback(() => {
    // remove keys if necessary
    try {
      keyList.current = keyList.current.slice(0, keyList.current.length - 1);
    } catch (e) {
      console.error(e);
    }

    setList((l) => l.slice(0, l.length - 1));
  }, []);

  const unshift = useCallback((item: T) => {
    setList((l) => {
      setKey(0);
      return [item].concat(l);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shift = useCallback(() => {
    try {
      keyList.current = keyList.current.slice(1, keyList.current.length);
    } catch (e) {
      console.error(e);
    }
    setList((l) => l.slice(1, l.length));
  }, []);

  const sortList = useCallback(
    (result: T[]) =>
      result
        .map((item, index) => ({ key: index, item }))
        .sort((a, b) => getIndex(a.key) - getIndex(b.key))
        .filter((item) => !!item.item)
        .map((item) => item.item),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    list,
    insert,
    merge,
    replace,
    remove,
    getKey,
    getIndex,
    move,
    push,
    pop,
    unshift,
    shift,
    sortList,
    resetList,
  };
};

export default useList;
