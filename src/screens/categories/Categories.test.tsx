import React from 'react';
import { Categories } from './Categories';
import { render, waitFor, cleanup, fireEvent } from '../../utils/testUtils';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient();

afterEach(cleanup);

describe('Categories screen', () => {
  it('renders categores screen', async () => {
    const data = {
      data: [
        {
          id: 3,
          name: 'Bedsheets',
          desc: '',
          parentId: null,
          marketing: true,
          createdAt: '2023-04-13T17:12:19.539Z',
          updatedAt: '2023-04-13T17:12:19.539Z',
          deletedAt: null,
        },
        {
          id: 5,
          name: 'Home Bedsheets',
          desc: '',
          parentId: 3,
          marketing: true,
          createdAt: '2023-04-13T17:13:24.754Z',
          updatedAt: '2023-04-13T17:13:24.754Z',
          deletedAt: null,
        },
        {
          id: 6,
          name: 'School Bedsheets',
          desc: '',
          parentId: 3,
          marketing: true,
          createdAt: '2023-04-13T17:13:35.245Z',
          updatedAt: '2023-04-13T17:13:35.245Z',
          deletedAt: null,
        },
      ],
    };

    // @ts-ignore
    axios.get.mockResolvedValueOnce(data);

    const { getByText, getByTestId, queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <Categories />
      </QueryClientProvider>,
    );

    expect(getByText('Category')).toBeTruthy();
    expect(getByTestId('hambergerIcon')).toBeTruthy();
    expect(getByText('Fetching categories ...')).toBeTruthy();

    await waitFor(() => {
      expect(queryByText('Fetching categories ...')).toBeNull();
    });

    fireEvent.press(getByTestId('arrowIcon'));

    expect(getByText('Bedsheets')).toBeTruthy();
    expect(getByText('Home Bedsheets')).toBeTruthy();
    expect(getByText('School Bedsheets')).toBeTruthy();
  });
});
