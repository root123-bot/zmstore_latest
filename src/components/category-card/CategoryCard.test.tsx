import React from 'react';
import { CategoryCard } from './CategoryCard';
import { render } from '../../utils/testUtils';

describe('CategoryCard', () => {
  it('renders categoryCard', () => {
    render(<CategoryCard source={''} description={'Bed sheets'} />);
  });
});
