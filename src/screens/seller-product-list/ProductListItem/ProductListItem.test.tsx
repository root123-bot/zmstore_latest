import React from 'react';
import { ProductListItem } from './ProductListItem';
import { render, screen } from '@src/utils/testUtils';

const blob = {
  metadata: {
    name: 'blanket',
    categoryId: 7,
    variants: [
      {
        inventory: {
          quantity: 1,
        },
      },
    ],
  },
  isDrafted: true,
  actionButtonPressedHandler: () => console.log('Hello world!'),
};

describe('Product List Item', () => {
  it('render successful render component', () => {
    render(<ProductListItem {...blob} />);
    expect(screen.getByText(blob.metadata.name)).toBeVisible();
    expect(
      screen.getByText(
        `Stock: ${blob.metadata.variants[0].inventory.quantity}`,
      ),
    ).toBeVisible();
    expect(screen.getByTestId('action-btn')).toBeOnTheScreen();
    expect(screen.getByTestId('img-component')).toBeOnTheScreen();
  });
});
