import React from 'react';
import { DemographicDetails } from './DemographicDetails';
import { render } from '../../../utils/testUtils';
import { MerchantSignupContext } from '../MerchantSignup';

describe('Demographic details', () => {
  it('renders demographic details component on merchant signUp screen', async () => {
    const contextData = {
      onSubmit: jest.fn(),
    };
    const screen = render(
      <MerchantSignupContext.Provider value={contextData}>
        <DemographicDetails />
      </MerchantSignupContext.Provider>,
    );
    expect(
      screen.getByText('Enter your details & set up password'),
    ).toBeTruthy();
  });
});
