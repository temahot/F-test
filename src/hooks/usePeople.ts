import { useMemo } from 'react';

import useSWRImmutable from 'swr/immutable';

import useNetwork from '~/hooks/common/useNetwork';
import { usePagination, type UsePaginationProps } from '~/hooks/usePagination';
import { ROUTES } from '~/routes';

type UsePeopleProps = Pick<UsePaginationProps, 'outerFilters'>;

export default function usePeople({ outerFilters }: UsePeopleProps) {
  const { api } = useNetwork();
  const { path, pagination } = usePagination({
    route: ROUTES.PEOPLE,
    outerFilters,
  });

  const { data, isLoading } = useSWRImmutable(
    path,
    async () => {
      const response = await api.people.fetchAllPeople(path);
      return response.data;
    },
    {
      revalidateOnFocus: false,
    }
  );

  return useMemo(
    () => ({
      people: data?.results ?? [],
      peopleAmount: data?.count ?? 0,
      peopleAreLoading: isLoading,
      pagination,
      path,
    }),
    [data?.count, data?.results, isLoading, pagination, path]
  );
}
