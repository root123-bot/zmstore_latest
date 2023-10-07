import React from 'react';
import { EmptyProductList } from './EmptyProductList';
import {
  fireEvent,
  render,
  screen,
  MockedStackNavigator,
} from '@utils/testUtils';
import { strings } from '@i18n';

describe('No products component', () => {
  it('renders no products component', async () => {
    const navTo = { name: 'AddProduct', content: 'Nav to product' };
    render(<MockedStackNavigator component={EmptyProductList} navTo={navTo} />);
    expect(
      screen.getByText(strings.general.welcome_zeromoja),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(strings.product_listing.start_listing_product),
    ).toBeOnTheScreen();
    expect(screen.getByTestId('addProduct')).toBeOnTheScreen();

    fireEvent(screen.getByText(strings.product_listing.add_product), 'press');
    expect(await screen.findByText(navTo.content)).toBeOnTheScreen();
  });
});
