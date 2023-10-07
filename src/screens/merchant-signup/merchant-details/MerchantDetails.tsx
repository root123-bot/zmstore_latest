import React, { useContext } from 'react';
import { MerchantSignupContext } from '../MerchantSignup';
import {
  MerchantDetailsForm,
  MerchantDetailsFormValues,
} from '@components/forms';

export function MerchantDetails() {
  const { onSubmit, onBack } = useContext(MerchantSignupContext);

  function submit(values: MerchantDetailsFormValues) {
    onSubmit(values, 2);
  }

  return <MerchantDetailsForm onSubmit={submit} onBack={onBack} />;
}
