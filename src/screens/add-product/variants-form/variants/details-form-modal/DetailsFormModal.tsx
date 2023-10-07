import React, { useRef } from 'react';
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  KeyboardAvoidingView,
  Modal,
} from 'native-base';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { strings } from '@i18n';
import currencies from '@utils/currencies';
import { useUpdateVariant } from '@src/queries';

interface FieldFormType {
  sku: string;
  quantity: string;
  priceAmount: string;
}

const validationSchema = yup.object().shape({
  sku: yup.string().notRequired(),
  quantity: yup.string().required(strings.add_product.form.quantity_required),
  priceAmount: yup
    .string()
    .required(strings.add_product.form.price_amount_required),
});

const DetailsFormModal = ({ variant, onDismiss, show }) => {
  const { mutate: updateVariant, isLoading: updating } = useUpdateVariant();
  const initialFocusRef = useRef(null);

  const handleSubmit = values => {
    const { sku, quantity, priceAmount } = values;
    const updates = {
      price: {
        amount: priceAmount,
        currency: currencies.TZ.code,
      },
      inventory: {
        quantity,
      },
      sku,
    };
    updateVariant(
      { id: variant.id, updates },
      {
        onSuccess: () => {
          onDismiss();
        },
      },
    );
  };

  const formik = useFormik<FieldFormType>({
    initialValues: {
      sku: variant?.sku || '',
      quantity: variant?.inventory?.quantity
        ? `${variant?.inventory?.quantity}`
        : '',
      priceAmount: variant?.price?.amount || '',
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  const closeForm = () => {
    formik.resetForm();
    onDismiss();
  };

  return (
    <Modal
      isOpen={show}
      flex={1}
      closeOnOverlayClick={false}
      size='full'
      justifyContent='flex-end'
      initialFocusRef={initialFocusRef}
      onClose={closeForm}>
      <KeyboardAvoidingView behavior='padding' bg='gray.300' w='100%'>
        <Modal.Content borderRadius={2}>
          <Modal.CloseButton />
          <Modal.Header>{variant?.variations}</Modal.Header>
          <Modal.Body flex={1} borderBottomWidth={0}>
            <FormControl
              mb={3}
              isInvalid={!!(formik.errors.quantity && formik.touched.quantity)}>
              <FormControl.Label>
                {strings.add_product.form.quantity_label}
              </FormControl.Label>
              <Input
                placeholder={strings.add_product.form.quantity_placeholder}
                value={formik.values.quantity}
                keyboardType='numeric'
                onChangeText={formik.handleChange('quantity')}
                ref={initialFocusRef}
              />
              <FormControl.ErrorMessage>
                {formik.errors.quantity}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              mb={3}
              isInvalid={
                !!(formik.errors.priceAmount && formik.touched.priceAmount)
              }>
              <FormControl.Label>
                {strings.add_product.form.price_amount_label}
              </FormControl.Label>
              <InputGroup>
                <InputLeftAddon children={currencies.TZ.abbr} />
                <Input
                  placeholder={
                    strings.add_product.form.price_amount_placeholder
                  }
                  value={formik.values.priceAmount}
                  keyboardType='numeric'
                  onChangeText={formik.handleChange('priceAmount')}
                  flex={1}
                />
              </InputGroup>
              <FormControl.ErrorMessage>
                {formik.errors.priceAmount}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              mb={3}
              isInvalid={!!(formik.errors.sku && formik.touched.sku)}>
              <FormControl.Label>
                {strings.add_product.form.sku_label}
              </FormControl.Label>
              <Input
                placeholder={strings.add_product.form.sku_placeholder}
                value={formik.values.sku}
                onChangeText={formik.handleChange('sku')}
              />
              <FormControl.ErrorMessage>
                {formik.errors.sku}
              </FormControl.ErrorMessage>
            </FormControl>
            <Button
              onPress={formik.handleSubmit as any}
              isLoading={updating}
              isLoadingText={strings.general.updating_btn_text}>
              {strings.general.update_btn_text}
            </Button>
          </Modal.Body>
        </Modal.Content>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export { DetailsFormModal };
