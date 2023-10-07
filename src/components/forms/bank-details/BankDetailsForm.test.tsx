import React from 'react';
import { BankDetailsForm } from './BankDetailsForm';
import { render, fireEvent, waitFor } from '../../../utils/testUtils';
import { testStore } from '..';

describe('Bank details form', () => {
  const onCancel = jest.fn();
  const onSubmit = jest.fn();
  const onBack = jest.fn();

  it('renders bank details form component on merchant signUp screen', async () => {
    const { getByText, getByPlaceholderText } = render(
      <BankDetailsForm onBack={onBack} onSubmit={onSubmit} />,
    );
    expect(getByText('Enter your Bank Details')).toBeTruthy();
    fireEvent(getByPlaceholderText('Bank Name'), 'onValueChange', 'CRDB');
    fireEvent.changeText(
      getByPlaceholderText('Account Number'),
      '015jkld5679023',
    );
    fireEvent.changeText(getByPlaceholderText('Branch Code'), 'CRDBDAR');
    fireEvent.press(getByText('Back'));
    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(getByPlaceholderText('Account Number')).toBeTruthy();
    });

    expect(onBack).toBeCalled();
    expect(onSubmit).toBeCalled();
  });

  it('renders bank details form component on profile screen', async () => {
    const { getByText, getByPlaceholderText } = render(
      <BankDetailsForm
        onCancel={onCancel}
        onSubmit={onSubmit}
        initialValues={testStore}
      />,
    );
    expect(getByText('Enter your Bank Details')).toBeTruthy();
    fireEvent(getByPlaceholderText('Bank Name'), 'onValueChange', 'CRDB');
    fireEvent.changeText(
      getByPlaceholderText('Account Number'),
      '015jkld5679023',
    );
    fireEvent.changeText(getByPlaceholderText('Branch Code'), 'CRDBDAR');
    fireEvent.press(getByText('CANCEL'));
    fireEvent.press(getByText('UPDATE'));

    await waitFor(() => {
      expect(getByPlaceholderText('Account Number')).toBeTruthy();
    });

    expect(onCancel).toBeCalled();
    expect(onSubmit).toBeCalled();
  });
});
