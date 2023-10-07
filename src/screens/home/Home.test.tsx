import React from 'react';
import { Home } from './Home';
import { render } from '../../utils/testUtils';

describe('Home', () => {
  it('renders search', () => {
    const screen = render(<Home />);
    expect(screen.getByPlaceholderText('Search products')).toBeTruthy();
  });
  it('renders section name and view all', () => {
    const screen = render(<Home />);
    expect(screen.getByText('Become a Merchant')).toBeTruthy();
    expect(screen.getByText('Shop By Category')).toBeTruthy();
    expect(screen.getByText('New Arrivals')).toBeTruthy();
    expect(screen.getByText('Shop By Product')).toBeTruthy();
    expect(screen.getByText('Towel Collection')).toBeTruthy();
    expect(screen.getByText('Bedsheet Collection')).toBeTruthy();
    expect(screen.getByText('Combo Set Offers')).toBeTruthy();

    expect(screen.getByTestId('categoryViewAll')).toBeTruthy();
    expect(screen.getByTestId('newArrivalsViewAll')).toBeTruthy();
    expect(screen.getByTestId('productsViewAll')).toBeTruthy();
    expect(screen.getByTestId('collectionViewAll')).toBeTruthy();
    expect(screen.getByTestId('bedsheetViewAll')).toBeTruthy();
    expect(screen.getByTestId('comboViewAll')).toBeTruthy();
  });
  it('renders icons available in the screen', () => {
    const screen = render(<Home />);
    expect(screen.getByTestId('hambergerIcon')).toBeTruthy();
    expect(screen.getByTestId('chevronRightIcon')).toBeTruthy();
    expect(screen.getAllByTestId('cartIcon')).toBeTruthy();
  });
});
