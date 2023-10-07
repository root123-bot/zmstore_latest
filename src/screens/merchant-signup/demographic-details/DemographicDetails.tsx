import React, { useContext } from 'react';
import { MerchantSignupContext } from '../MerchantSignup';
import {
  DemographicDetailsForm,
  DemographicDetailsFormValues,
} from '@components/forms';

export function DemographicDetails() {
  const { onSubmit } = useContext(MerchantSignupContext);

  function submit(values: DemographicDetailsFormValues) {
    onSubmit(values, 0);
  }

  return <DemographicDetailsForm onSubmit={submit} />;
}
