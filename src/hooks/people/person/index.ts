import { useMemo } from 'react';

import { useRouter } from 'next/router';
import useSWR from 'swr';

import { notify } from '~/helpers/common/notify';
import useNetwork from '~/hooks/common/useNetwork';
import { ROUTES } from '~/routes';
import { type Person } from '~/types/person';

interface UsePersonReturn {
  personIsLoading: boolean;
  person: Person | undefined;
}

interface UsePersonProps {
  id: number | string;
}

export default function usePerson({ id }: UsePersonProps): UsePersonReturn {
  const { api } = useNetwork();
  const router = useRouter();
  const fetchPersonById = async () => {
    try {
      const response = await api.people.fetchPeopleById({
        id,
      });
      return response.data;
    } catch {
      notify('error', 'Person not found');
      await router.push(`/${ROUTES.PEOPLE}`);
      throw new Error('fetchPersonById failed');
    }
  };

  const { data, isLoading } = useSWR<Person>(
    `${ROUTES.PEOPLE}/${id}`,
    fetchPersonById,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );

  return useMemo(
    () => ({
      personIsLoading: isLoading,
      person: data,
    }),
    [data, isLoading]
  );
}
