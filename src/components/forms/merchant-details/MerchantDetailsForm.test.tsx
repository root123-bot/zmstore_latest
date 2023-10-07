import React from 'react';
import { MerchantDetailsForm } from './MerchantDetailsForm';
import { render, fireEvent, waitFor } from '../../../utils/testUtils';
import { testStore } from '..';

describe('Merchant details form', () => {
  const onCancel = jest.fn();
  const onSubmit = jest.fn();
  const onBack = jest.fn();

  it('renders merchant details form component on merchant signUp screen', async () => {
    const { getByText, getByPlaceholderText } = render(
      <MerchantDetailsForm onBack={onBack} onSubmit={onSubmit} />,
    );
    expect(getByText('Fill in the Address')).toBeTruthy();
    fireEvent.changeText(getByPlaceholderText('Street Name'), 'Tegeta');
    fireEvent.changeText(getByPlaceholderText('City Name'), 'Dar es salaam');
    fireEvent(getByPlaceholderText('Country'), 'onValueChange', 'CRDB');
    fireEvent.press(getByText('Back'));
    fireEvent.press(getByText('Proceed'));

    await waitFor(() => {
      expect(getByPlaceholderText('Street Name')).toBeTruthy();
    });

    expect(onBack).toBeCalled();
    expect(onSubmit).toBeCalled();
  });

  it('renders merchant details form component on merchant profile screen', async () => {
    const { getByText, getByPlaceholderText } = render(
      <MerchantDetailsForm
        onCancel={onCancel}
        onSubmit={onSubmit}
        initialValues={testStore}
      />,
    );
    expect(getByText('Fill in the Address')).toBeTruthy();
    fireEvent.changeText(getByPlaceholderText('Street Name'), 'Tegeta');
    fireEvent.changeText(getByPlaceholderText('City Name'), 'Dar es salaam');
    fireEvent(getByPlaceholderText('Country'), 'onValueChange', 'CRDB');
    fireEvent.press(getByText('CANCEL'));
    fireEvent.press(getByText('UPDATE'));

    await waitFor(() => {
      expect(getByPlaceholderText('Street Name')).toBeTruthy();
    });
    expect(onCancel).toBeCalled();
    expect(onSubmit).toBeCalled();
  });
});
