import React from 'react';
import { ZText, ZSelect } from '@components/inputs';
import { ZButton } from '@components/z-button';
import { Text, VStack, HStack, Pressable } from 'native-base';
import { Formik } from 'formik';
import { banksDetailsSchema } from '@src/schemas';
import { strings } from '@i18n';
import { MerchantFormProps } from '@src/types';

export type BankDetailsFormValues = {
  bankName: string;
  bankAccountNumber: string;
  bankBranch: string;
};

export function BankDetailsForm({
  onBack,
  onCancel,
  onSubmit,
  initialValues,
}: MerchantFormProps) {
  const banks = [
    {
      label: 'CRDB',
      value: 'CRDB',
    },
  ];

  function submit(values: BankDetailsFormValues) {
    onSubmit(values);
  }

  return (
    <Formik
      initialValues={{
        bankName: initialValues?.bankName ?? '',
        bankAccountNumber: initialValues?.bankAccountNumber ?? '',
        bankBranch: initialValues?.bankBranch ?? '',
      }}
      validationSchema={banksDetailsSchema}
      onSubmit={submit}>
      {({ handleChange, handleSubmit, values, isValid, errors, touched }) => (
        <VStack space={4}>
          <Text fontSize={14} color='gray.800'>
            {strings.merchantSignUpScreen.enterBankDetails}
          </Text>
          <ZSelect
            selectionItems={banks}
            placeholder={strings.bankName}
            onValueChange={handleChange('bankName')}
            selectedValue={values.bankName}
            invalidMessage={errors.bankName}
            isInvalid={errors.bankName && touched.bankName}
          />
          <ZText
            placeholder={strings.accountNumber}
            invalidMessage={errors.bankAccountNumber}
            isInvalid={errors.bankAccountNumber && touched.bankAccountNumber}
            value={values.bankAccountNumber}
            onChangeText={handleChange('bankAccountNumber')}
          />
          <ZText
            placeholder={strings.branchCode}
            invalidMessage={errors.bankBranch}
            isInvalid={errors.bankBranch && touched.bankBranch}
            value={values.bankBranch}
            onChangeText={handleChange('bankBranch')}
          />
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
            <HStack alignItems='center' justifyContent='space-between'>
              <Pressable onPress={onBack}>
                <Text fontSize={16} color='black'>
                  {strings.back}
                </Text>
              </Pressable>
              <ZButton
                onPress={handleSubmit}
                disabled={!isValid}
                w='1/2'
                variant='solid'>
                {strings.submit}
              </ZButton>
            </HStack>
          )}
        </VStack>
      )}
    </Formik>
  );
}
