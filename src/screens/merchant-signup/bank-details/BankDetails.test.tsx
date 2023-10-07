import React from 'react';
import { BankDetails } from './BankDetails';
import { render } from '../../../utils/testUtils';
import { MerchantSignupContext } from '../MerchantSignup';

describe('Bank details', () => {
  it('renders bank details component on merchant signUp screen', async () => {
    const contextData = {
      onSubmit: jest.fn(),
      onBack: jest.fn(),
    };
    const screen = render(
      <MerchantSignupContext.Provider value={contextData}>
        <BankDetails />
      </MerchantSignupContext.Provider>,
    );
    expect(screen.getByText('Enter your Bank Details')).toBeTruthy();
  });
});
