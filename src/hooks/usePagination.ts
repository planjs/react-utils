import { useMemo } from 'react';
import useSafeState from './useSafeState';

export interface PaginationOptions {
  /**
   * @default 1
   */
  defaultPage?: number;
  /**
   * @default 10
   */
  defaultPageSize?: number;
  /**
   * 总数
   */
  total: number;
}

export interface PaginationResult {
  setPage: (page: number) => void;
  setNextPage: () => void;
  setPreviousPage: () => void;
  setPageSize: (pageSize: number, nextPage?: number) => void;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPage: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

const usePagination = (options: PaginationOptions): PaginationResult => {
  const { defaultPageSize = 10, defaultPage = 1, total } = options;

  const [page, setPage] = useSafeState(defaultPage);
  const [pageSize, setPageSize] = useSafeState(defaultPageSize);

  const totalPage = useMemo(() => Math.ceil(total / pageSize), [pageSize, total]);
  const offset = useMemo(() => (page - 1) * pageSize, [pageSize, page]);
  const hasMore = useMemo(() => totalPage > page, [page, totalPage]);

  return {
    setPage(page) {
      if (page <= totalPage) {
        setPage(page);
      }
    },
    setPreviousPage() {
      let p = page;
      this.setPage(--p);
    },
    setNextPage() {
      let p = page;
      this.setPage(++p);
    },
    setPageSize(pageSize: number, nextPage?: number) {
      setPageSize(pageSize);
      if (nextPage) {
        this.setPage(nextPage);
      }
    },
    pagination: {
      page,
      pageSize,
      total,
      totalPage,
      limit: pageSize,
      offset,
      hasMore,
    },
  };
};

export default usePagination;
