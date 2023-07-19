import React, { ReactElement, useCallback, useMemo, useState } from 'react';

import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

import { Table } from '~/components/common/table';
import { TextFilter } from '~/components/text-filter';
import getUniqueIdFromUrl from '~/helpers/getUniqueIdFromUrl';
import { FILTER_KEYS } from '~/hooks/usePagination';
import usePeople from '~/hooks/usePeople';
import { ROUTES } from '~/routes';
import { COLORS } from '~/styles/colors';
import { type Person } from '~/types/person';

const NameLink = styled(Typography)({
  cursor: 'pointer',
  color: COLORS.PRIMARY,
  textDecoration: 'underline',
});

export interface OuterFilters {
  search: string;
}

type TableHeaders = Pick<
  Person,
  'name' | 'skin_color' | 'height' | 'mass' | 'birth_year'
> & { id: string };

const headers: Record<keyof TableHeaders, string> = {
  id: 'Id',
  name: 'Name',
  skin_color: 'Color of skin',
  height: 'Height',
  mass: 'Mass',
  birth_year: 'Day of birth',
};

export const formattedHeaders = Object.values(headers);

export const PeopleTable = (): ReactElement => {
  const initialFilters = {
    search: '',
  };

  const [appliedFilters, setAppliedFilters] =
    useState<OuterFilters>(initialFilters);

  const { mutate } = useSWRConfig();
  const router = useRouter();

  const { people, peopleAreLoading, peopleAmount, pagination } = usePeople({
    outerFilters: appliedFilters,
  });

  const handleOpenPerson = useCallback(
    async (person: Person) => {
      const id = getUniqueIdFromUrl(person.url);
      void router.push({
        pathname: `${ROUTES.PEOPLE}/[id]`,
        query: { id },
      });
      await mutate(`${ROUTES.PEOPLE}/${id}`, person, {
        revalidate: false,
        optimisticData: true,
      });
    },
    [mutate, router],
  );

  const peopleTableUi = useMemo(
    () =>
      people.map((person) => ({
        id: getUniqueIdFromUrl(person.url),
        name: (
          <NameLink
            variant={'body1'}
            onClick={() => {
              void handleOpenPerson(person);
            }}
          >
            {person.name}
          </NameLink>
        ),
        skin_color: person.skin_color ?? 'empty',
        height: person.height ?? 'empty',
        mass: person.mass ?? 'empty',
        birth_year: person.birth_year ?? 'empty',
      })),
    [handleOpenPerson, people],
  );

  return (
    <>
      <TextFilter
        label={'Search by name'}
        onChange={({ target: { value } }) => {
          setAppliedFilters((prevState) => ({
            ...prevState,
            [FILTER_KEYS.SEARCH]: value,
          }));
        }}
      />

      <Table
        data={peopleTableUi}
        headers={formattedHeaders}
        itemsAmount={peopleAmount}
        pagination={pagination}
        isLoading={peopleAreLoading}
      />
    </>
  );
};
