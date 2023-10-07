import React from 'react';
import { ZButton } from './Button';
import { render } from '../../utils/testUtils';

describe('Button', () => {
  it('renders default Button', () => {
    const screen = render(<ZButton variant='solid'>Zeromoja</ZButton>);
    expect(screen.getByText('Zeromoja')).toBeTruthy();
  });
});
