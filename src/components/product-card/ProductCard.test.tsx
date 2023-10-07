import React from 'react';
import { ProductCard } from './ProductCard';
import { render } from '../../utils/testUtils';

describe('ProductCard', () => {
  it('renders product card', () => {
    render(<ProductCard source={''} description={''} sale={true} />);
  });
});
