import React, { ReactElement } from 'react';
import renderer, { act } from 'react-test-renderer';

import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import {
  formattedHeaders,
  PeopleTable,
} from '~/components/people/people-table';

let TestComponent: ReactElement;

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('People page', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ query: {} });
    TestComponent = <PeopleTable />;
    await act(() => {
      render(TestComponent);
    });
  });

  it('renders correctly', () => {
    const tree = renderer.create(TestComponent).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('required headers renders', () => {
    const renderHeaders = formattedHeaders.map((text) =>
      screen.getByText(text),
    );

    renderHeaders.forEach((item) => {
      expect(item).toBeTruthy();
    });
  });

  it('Data from api renders correctly', () => {
    const renderHeaders = formattedHeaders.map((text) =>
      screen.getByText(text),
    );

    renderHeaders.forEach((item) => {
      expect(item).toBeTruthy();
    });
  });
});
