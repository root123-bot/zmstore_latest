import React from 'react';
import { Signup } from './Signup';
import { render } from '../../utils/testUtils';

describe('Signup', () => {
  it('should successfully signup user', () => {
    const screen = render(<Signup navigation={''} />);
    expect(screen.getAllByRole('image')).toBeTruthy();
    expect(screen.getByTestId('zeromoja-01')).toBeTruthy();
    expect(screen.getByText('Welcome to Zeromoja')).toBeTruthy();
    expect(
      screen.getByText('Get Verified by your Mobile Phone Number'),
    ).toBeTruthy();
    expect(
      screen.getByText('Enter your mobile number to get started'),
    ).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter phone number')).toBeTruthy();
    expect(screen.getByText('SEND OTP')).toBeTruthy();
    expect(screen.getByText('Already have an account?')).toBeTruthy();
    expect(screen.getByText('Login')).toBeTruthy();
  });
});
