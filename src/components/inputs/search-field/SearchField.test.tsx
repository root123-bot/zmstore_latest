import React from 'react';
import { SearchField } from './SearchField';
import { render, screen } from '../../../utils/testUtils';

describe('SearchField', () => {
  it('renders search component', () => {
    render(<SearchField placeholder='Search products' />);
    expect(screen.getByPlaceholderText('Search products')).toBeTruthy();
    expect(screen.getByTestId('searchIcon')).toBeTruthy();
  });
});
