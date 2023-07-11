import { type UsePaginationReturn } from '~/hooks/usePagination';

export interface TableProps {
  data: Array<Record<string, any>> | [];
  headers: Array<string | number>;
  pagination?: UsePaginationReturn['pagination'];
  itemsAmount?: number;
  isLoading: boolean;
}
