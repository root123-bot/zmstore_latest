import React from 'react';
import { MerchantDetails } from './MerchantDetails';
import { render } from '../../../utils/testUtils';
import { MerchantSignupContext } from '../MerchantSignup';

describe('Merchant details', () => {
  it('renders merchant details component on merchant signUp screen', async () => {
    const contextData = {
      onSubmit: jest.fn(),
      onBack: jest.fn(),
    };
    const screen = render(
      <MerchantSignupContext.Provider value={contextData}>
        <MerchantDetails />
      </MerchantSignupContext.Provider>,
    );

    expect(screen.getByText('Fill in the Address')).toBeTruthy();
  });
});
