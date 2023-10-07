import React from 'react';
import { DemographicDetailsForm } from './DemographicDetailsForm';
import { render, fireEvent, waitFor } from '../../../utils/testUtils';
import { testUser } from '..';

describe('Demographic details form', () => {
  const onCancel = jest.fn();
  const onSubmit = jest.fn();

  it('renders demographic details form component on merchant signUp screen', async () => {
    const { getByText, getByPlaceholderText } = render(
      <DemographicDetailsForm onSubmit={onSubmit} />,
    );
    expect(getByText('Enter your details & set up password')).toBeTruthy();
    fireEvent.changeText(getByPlaceholderText('First Name'), 'Jon');
    fireEvent.changeText(getByPlaceholderText('Last Name'), 'Jon Doe');
    fireEvent.changeText(getByPlaceholderText('Email Address'), 'Joe@doe.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'Jon@doe1a)@');
    fireEvent.press(getByText('Proceed'));

    await waitFor(() => {
      expect(getByPlaceholderText('First Name')).toBeTruthy();
    });

    expect(onSubmit).toBeCalled();
  });

  it('renders demographic details form component on profile screen', async () => {
    const { getByText, getByPlaceholderText } = render(
      <DemographicDetailsForm
        onCancel={onCancel}
        onSubmit={onSubmit}
        initialValues={testUser}
      />,
    );
    expect(getByText('Enter your details & set up password')).toBeTruthy();
    fireEvent.changeText(getByPlaceholderText('First Name'), 'Jon');
    fireEvent.changeText(getByPlaceholderText('Last Name'), 'Jon Doe');
    fireEvent.changeText(getByPlaceholderText('Email Address'), 'Joe@doe.com');
    fireEvent.press(getByText('CANCEL'));
    fireEvent.press(getByText('UPDATE'));

    await waitFor(() => {
      expect(getByPlaceholderText('First Name')).toBeTruthy();
    });

    expect(onCancel).toBeCalled();
    expect(onSubmit).toBeCalled();
  });
});
