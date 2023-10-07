import React from 'react';
import { SellerProductList } from './SellerProductList';
import { renderApp as render } from '@utils/testUtils';

describe('SellerProductList screen', () => {
  it('renders products screen', () => {
    const initialState = {
      auth: {
        authUser: { storeId: 1 },
      },
    };
    render(<SellerProductList navigation={jest.fn} />, initialState);
  });
});
