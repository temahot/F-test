import React from 'react';
import renderer, { act } from 'react-test-renderer';

import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import allPeopleResponse from '~/__mocks__/all-people-response';
import { Table } from '~/components/common/table';
import { formattedHeaders } from '~/components/people/people-table';
import getUniqueIdFromUrl from '~/helpers/getUniqueIdFromUrl';
import { type Person } from '~/types/person';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

let peopleResponse: Person[];

describe('Table component', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    peopleResponse = allPeopleResponse.results.map((person) => ({
      ...person,
      id: getUniqueIdFromUrl(person.url),
    }));

    (useRouter as jest.Mock).mockReturnValue({ query: {} });
    await act(() => {
      render(
        <Table
          data={peopleResponse}
          headers={formattedHeaders}
          isLoading={false}
        />
      );
    });
  });

  it('Renders correctly', () => {
    const tree = renderer
      .create(
        <Table
          data={peopleResponse}
          headers={formattedHeaders}
          isLoading={false}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Mock data renders in columns', () => {
    const people = peopleResponse.map((person) =>
      screen.getByText(person.name)
    );

    people.forEach((item) => {
      expect(item).toBeTruthy();
    });
  });
});
