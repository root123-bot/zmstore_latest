import React from 'react';
import { Cart } from './Cart';
import { render } from '../../utils/testUtils';

describe('Cart', () => {
  it('displays a word "Cart" on the screen', () => {
    render(<Cart />);
  });
});
