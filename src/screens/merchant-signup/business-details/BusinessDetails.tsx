import React, { useContext } from 'react';
import { MerchantSignupContext } from '../MerchantSignup';
import {
  BusinessDetailsForm,
  BusinessDetailsFormValues,
} from '@components/forms';

export function BusinessDetails() {
  const { onSubmit, onBack } = useContext(MerchantSignupContext);

  function submit(values: BusinessDetailsFormValues) {
    onSubmit(values, 1);
  }

  return <BusinessDetailsForm onSubmit={submit} onBack={onBack} />;
}
