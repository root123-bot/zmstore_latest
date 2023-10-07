import React from 'react';

import { MerchantSignUp } from './MerchantSignup';
import { render } from '../../utils/testUtils';

describe('Merchant signup', () => {
  it('renders merchant signUp screen', () => {
    const screen = render(<MerchantSignUp />);
    expect(screen.getByTestId('zeromoja-icon')).toBeTruthy();
    expect(screen.getByText('Welcome to Zeromoja')).toBeTruthy();
    expect(
      screen.getByText('Create your account to start selling'),
    ).toBeTruthy();
  });
});
