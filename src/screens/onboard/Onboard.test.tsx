import React from 'react';
import { Onboard } from './Onboard';
import { render } from '../../utils/testUtils';

describe('Onboard', () => {
  it('renders default texts and images', () => {
    const screen = render(<Onboard navigation={''} />);
    expect(screen.getAllByRole('image')).toBeTruthy();
    expect(screen.getByText('Best Furnishing Items For you')).toBeTruthy();
    expect(
      screen.getByText(
        'Voluptas neque molestiae eveniet atque earum voluptas. molestiae',
      ),
    ).toBeTruthy();
    expect(screen.getByText('Skip')).toBeTruthy();
    expect(screen.getByTestId('arrow-right-1')).toBeTruthy();
  });
});
