import React from 'react';

import {
  MockedStackNavigator,
  asMock,
  fireEvent,
  renderApp as render,
  screen,
} from '@src/utils/testUtils';
import { SellerProductList } from './SellerProductList';
import axiosMock from 'axios';
import { ProductFactory } from '@src/utils/factories';

const navigation = () => {};

jest.mock('../../components/topbar-navigator', () => {
  const Text = require('native-base').Text;
  return {
    TopbarNavigator: () => <Text>topbar</Text>,
  };
});
jest.mock('./empty-product-list', () => {
  const Text = require('native-base').Text;
  return {
    EmptyProductList: () => <Text testID='empty-product' />,
  };
});

describe('SellerProductList', () => {
  it('should show empty list when no products', async () => {
    const initialState = {
      auth: {
        authUser: { storeId: 1 },
      },
    };
    const Get = asMock(axiosMock.get);
    Get.mockResolvedValue({ data: { data: [], total: 0 } });
    render(<SellerProductList navigation={navigation} />, initialState);
    expect(await screen.findByText('topbar')).toBeOnTheScreen();
    expect(screen.getByTestId('empty-product')).toBeOnTheScreen();
  });

  it('should show product list', async () => {
    const initialState = {
      auth: {
        authUser: { storeId: 1 },
      },
    };
    const Get = asMock(axiosMock.get);
    const products = ProductFactory.buildList(2);
    Get.mockResolvedValue({ data: { data: products, total: 2 } });
    render(<SellerProductList navigation={navigation} />, initialState);
    expect(await screen.findByText('topbar')).toBeOnTheScreen();
    expect(screen.queryByTestId('empty-product')).not.toBeOnTheScreen();
    expect(screen.getByText(products[0].name)).toBeOnTheScreen();
  });

  it('trigger add new product', async () => {
    const initialState = {
      auth: {
        authUser: { storeId: 1 },
      },
    };

    const navTo = { name: 'AddProduct', content: 'Navigate to product' };

    render(
      <MockedStackNavigator
        aria-label='test-provider'
        component={SellerProductList}
        navTo={navTo}
      />,
      initialState,
    );

    fireEvent(screen.getByRole('button'), 'press');
    expect(await screen.findByText(navTo.content)).toBeOnTheScreen();
  });
});
