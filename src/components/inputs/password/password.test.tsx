import React from 'react';
import { ZPassword } from './Password';
import { render } from '../../../utils/testUtils';

describe('Password field', () => {
  it('renders valid password field', () => {
    const screen = render(<ZPassword placeholder='password' />);
    expect(screen.getByPlaceholderText('password')).toBeTruthy();
  });

  it('renders invalid password field', () => {
    const screen = render(
      <ZPassword
        placeholder='password'
        isInvalid
        invalidMessage='password required'
      />,
    );
    expect(screen.getByPlaceholderText('password')).toBeTruthy();
    expect(screen.getByText('password required')).toBeTruthy();
  });
});
