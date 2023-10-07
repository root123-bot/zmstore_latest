import React from 'react';
import { demographicDetailsSchema } from '@src/schemas';
import { Text, VStack, HStack } from 'native-base';
import { Formik } from 'formik';
import { ZText, ZPassword } from '@components/inputs';
import { ZButton } from '@components/z-button';
import { strings } from '@i18n';
import { MerchantFormProps } from '@src/types';

export type DemographicDetailsFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export function DemographicDetailsForm({
  onCancel,
  onSubmit,
  initialValues,
}: MerchantFormProps) {
  function submit(values: DemographicDetailsFormValues) {
    onSubmit(values);
  }

  return (
    <Formik
      initialValues={{
        firstName: initialValues?.firstName ?? '',
        lastName: initialValues?.lastName ?? '',
        email: initialValues?.email ?? '',
        password: '',
      }}
      validationSchema={
        initialValues?.id
          ? demographicDetailsSchema.omit(['password'])
          : demographicDetailsSchema
      }
      onSubmit={submit}>
      {({ handleChange, handleSubmit, values, isValid, errors, touched }) => (
        <VStack space={4}>
          <Text fontSize={14} color='gray.800'>
            {strings.merchantSignUpScreen.enterDetailsSetUpPassword}
          </Text>
          <ZText
            placeholder={strings.firstName}
            invalidMessage={errors.firstName}
            isInvalid={errors.firstName && touched.firstName}
            value={values.firstName}
            onChangeText={handleChange('firstName')}
          />
          <ZText
            placeholder={strings.lastName}
            invalidMessage={errors.lastName}
            isInvalid={errors.lastName && touched.lastName}
            value={values.lastName}
            onChangeText={handleChange('lastName')}
          />
          <ZText
            placeholder={strings.emailAddress}
            invalidMessage={errors.email}
            isInvalid={errors.email && touched.email}
            value={values.email}
            onChangeText={handleChange('email')}
          />
          {!initialValues && (
            <ZPassword
              placeholder={strings.password}
              invalidMessage={errors.password}
              isInvalid={errors.password && touched.password}
              value={values.password}
              onChangeText={handleChange('password')}
            />
          )}
          {initialValues?.id ? (
            <HStack alignItems='center' justifyContent='space-between'>
              <ZButton
                onPress={onCancel}
                disabled={!isValid}
                w='2/5'
                variant='outline'>
                {strings.cancel}
              </ZButton>
              <ZButton
                onPress={handleSubmit}
                disabled={!isValid}
                w='2/5'
                variant='solid'>
                {strings.update}
              </ZButton>
            </HStack>
          ) : (
            <ZButton onPress={handleSubmit} disabled={!isValid} variant='solid'>
              {strings.proceed}
            </ZButton>
          )}
        </VStack>
      )}
    </Formik>
  );
}
