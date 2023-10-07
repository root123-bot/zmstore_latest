import React from 'react';
import { BusinessDetails } from './BusinessDetails';
import { render } from '../../../utils/testUtils';
import { MerchantSignupContext } from '../MerchantSignup';

describe('Business details', () => {
  it('renders business details component on merchant signUp screen', () => {
    const contextData = {
      onSubmit: jest.fn(),
      onBack: jest.fn(),
    };
    const screen = render(
      <MerchantSignupContext.Provider value={contextData}>
        <BusinessDetails />
      </MerchantSignupContext.Provider>,
    );
    expect(screen.getByText('Enter your Business Details')).toBeTruthy();
  });
});
