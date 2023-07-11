import { useMemo, useState } from 'react';

import { cleanObjectFromEmptyValues } from '~/helpers/common/cleanObjectFromEmptyValues';
import { type ROUTES } from '~/routes';

type Pagination = UsePaginationReturn['pagination'];

export enum FILTER_KEYS {
  SEARCH = 'search',
}

type OuterFiltersType = Record<FILTER_KEYS.SEARCH, string>;

export interface UsePaginationProps {
  route: ROUTES;
  outerFilters?: Partial<OuterFiltersType>;
}

export interface UsePaginationReturn {
  path: string;
  pagination: {
    page: number;
    setPage: (p: Pagination['page']) => void;
    rowsPerPage: number;
    setRowsPerPage: (r: Pagination['rowsPerPage']) => void;
  };
}

export enum PAGINATION {
  INITIAL_PAGE = 1,
  INITIAL_ROWS_PER_PAGE = 10,
}

export function usePagination({
  route,
  outerFilters = {},
}: UsePaginationProps): UsePaginationReturn {
  const [page, setPage] = useState<number>(PAGINATION.INITIAL_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    PAGINATION.INITIAL_ROWS_PER_PAGE
  );

  const query = new URLSearchParams({
    page: String(page),
    ...cleanObjectFromEmptyValues(outerFilters),
  }).toString();

  const path = `${route}?${query}`;

  return useMemo(
    () => ({
      path,
      pagination: {
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
      },
    }),
    [page, path, rowsPerPage]
  );
}
