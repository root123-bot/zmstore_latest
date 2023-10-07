import React from 'react';
import { ConfirmCode } from './ConfirmCode';
import { render, screen } from '../../utils/testUtils';

describe('ConfirmCode', () => {
  it('renders the default texts', () => {
    render(<ConfirmCode lastDigits={'10'} />);
    expect(screen.getByText('Enter the OTP sent on ********10')).toBeTruthy();
    expect(screen.getByText('VERIFY')).toBeTruthy();
    expect(screen.getByText('Didn’t get the OTP?')).toBeTruthy();
    expect(screen.getByText('Resend OTP')).toBeTruthy();
    expect(
      screen.getByText('Phone  Number Verification Successful'),
    ).toBeTruthy();
    expect(
      screen.getByText(
        'You will be directed to the Merchant center in few seconds',
      ),
    ).toBeTruthy();
  });
});
