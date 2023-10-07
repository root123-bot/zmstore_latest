import React from 'react';
import { PhoneField } from './PhoneField';
import { render } from '../../../utils/testUtils';

describe('Password field', () => {
  it('renders default phone field', () => {
    const screen = render(<PhoneField />);
    expect(screen.getByPlaceholderText('Enter phone number')).toBeTruthy();
  });

  it('renders phone field with code number', () => {
    const screen = render(<PhoneField />);
    expect(screen.getByRole('image')).toBeTruthy();
    expect(screen.getByText('+255')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter phone number')).toBeTruthy();
  });
});
