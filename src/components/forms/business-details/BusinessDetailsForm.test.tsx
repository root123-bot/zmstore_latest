import React from 'react';
import { BusinessDetailsForm } from './BusinessDetailsForm';
import { render, fireEvent, waitFor } from '../../../utils/testUtils';
import { testStore } from '..';

describe('Business details form', () => {
  const onCancel = jest.fn();
  const onSubmit = jest.fn();
  const onBack = jest.fn();

  it('renders business details form component on merchant signUp screen', async () => {
    const { getByText, getByPlaceholderText } = render(
      <BusinessDetailsForm onBack={onBack} onSubmit={onSubmit} />,
    );
    expect(getByText('Enter your Business Details')).toBeTruthy();
    expect(getByText('Account Type')).toBeTruthy();
    expect(getByText('Select Your Store Category')).toBeTruthy();
    fireEvent.press(getByText('Individual'));
    fireEvent.changeText(getByPlaceholderText('Business Name'), 'Zeromoja');
    fireEvent.changeText(getByPlaceholderText('Phone number'), '0782546129');
    fireEvent(
      getByPlaceholderText('Store Category'),
      'onValueChange',
      'Clothing',
    );
    fireEvent.changeText(getByPlaceholderText('Tin number'), '1245785');
    fireEvent.press(getByText('Back'));
    fireEvent.press(getByText('Proceed'));

    await waitFor(() => {
      expect(getByText('Enter your Business Details')).toBeTruthy();
    });

    expect(onBack).toBeCalled();
    expect(onSubmit).toBeCalled();
  });

  it('renders business details form component on profile screen', async () => {
    const { getByText, getByPlaceholderText } = render(
      <BusinessDetailsForm
        onCancel={onCancel}
        onSubmit={onSubmit}
        initialValues={testStore}
      />,
    );
    expect(getByText('Enter your Business Details')).toBeTruthy();
    expect(getByText('Account Type')).toBeTruthy();
    expect(getByText('Select Your Store Category')).toBeTruthy();
    fireEvent.press(getByText('Individual'));
    fireEvent.changeText(getByPlaceholderText('Phone number'), '0782546129');
    fireEvent(
      getByPlaceholderText('Store Category'),
      'onValueChange',
      'Clothing',
    );
    fireEvent.changeText(getByPlaceholderText('Tin number'), '1245785');
    fireEvent.press(getByText('CANCEL'));
    fireEvent.press(getByText('UPDATE'));

    await waitFor(() => {
      expect(getByText('Enter your Business Details')).toBeTruthy();
    });

    expect(onCancel).toBeCalled();
    expect(onSubmit).toBeCalled();
  });
});
