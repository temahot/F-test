import React from 'react';
import { useController } from 'react-hook-form';
import renderer, { act } from 'react-test-renderer';

import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

import allPeopleResponse from '~/__mocks__/all-people-response';
import PersonPageContent from '~/components/people/person/page-content';
import usePersonValidation from '~/components/people/person/page-content/validation/usePersonValidation';
import usePerson from '~/hooks/people/person';
import { type Person } from '~/types/person';

const mockData: { person: Person; testCb: () => void } = {
  person: allPeopleResponse.results[0],
  testCb: jest.fn(),
};

jest.mock('react-hook-form');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock(
  '~/components/people/person/page-content/validation/usePersonValidation'
);
jest.mock('~/hooks/people/person');
jest.mock('swr', () => ({
  mutate: jest.fn(),
  useSWRConfig: jest.fn(),
}));

describe('Person page component', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    mockData.person = allPeopleResponse.results[0];
    mockData.testCb = jest.fn();
    (useController as jest.Mock).mockReturnValue({
      field: jest.fn(),
    });
    (useRouter as jest.Mock).mockReturnValue({ query: {} });
    (usePerson as jest.Mock).mockReturnValue({
      person: mockData.person,
      personIsLoading: false,
    });
    (usePersonValidation as jest.Mock).mockReturnValue({
      resetPersonForm: mockData.testCb,
      form: {
        watch: jest.fn().mockReturnValue(mockData.person),
        handleSubmit: jest.fn(),
        formState: {
          errors: [],
        },
      },
    });
    (useSWRConfig as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });

    await act(() => {
      render(<PersonPageContent personId={1} />);
    });
  });

  it('Renders correctly', () => {
    const tree = renderer.create(<PersonPageContent personId={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('resetFrom should call mutate if person exists', () => {
    expect(mockData.testCb).toBeCalledWith(mockData.person);
  });
});
