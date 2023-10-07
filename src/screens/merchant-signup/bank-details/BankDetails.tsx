import React, { useContext } from 'react';
import { MerchantSignupContext } from '../MerchantSignup';
import { BankDetailsForm, BankDetailsFormValues } from '@components/forms';

export function BankDetails() {
  const { onSubmit, onBack } = useContext(MerchantSignupContext);

  function submit(values: BankDetailsFormValues) {
    onSubmit(values, 3);
  }

  return <BankDetailsForm onSubmit={submit} onBack={onBack} />;
}
