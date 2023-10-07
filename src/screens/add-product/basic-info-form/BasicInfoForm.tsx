import React from 'react';
import {
  Box,
  ScrollView,
  FormControl,
  Flex,
  Button,
  Select,
  Input,
  TextArea,
  Radio,
  InputGroup,
  InputLeftAddon,
  Text,
} from 'native-base';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { strings } from '@i18n';
import { useToast } from 'native-base';
import {
  useGetProductCategories,
  useCreateProduct,
  useCreateProductWithVariants,
  useGetProductById,
  useUpdateProduct,
} from '@queries';
import currencies from '@utils/currencies';
import { useAuth } from '@src/context/AuthContext';
import { LoadingSpinner } from '@src/components/loading-spinner';

export interface ProductFieldFormType {
  name: string;
  desc: string;
  category: string;
  sku: string;
  hasVariants: string;
  quantity: string;
  priceAmount: string;
}

interface PropType {
  onSubmitSuccess?: (data: unknown) => void;
  productId?: number;
}

const productSchema = yup.object().shape({
  category: yup.string().required(strings.add_product.form.category_required),
  name: yup.string().required(strings.add_product.form.name_required),
  hasVariants: yup.string(),
  sku: yup.string().when('hasVariants', (hasVariants, schema) => {
    return !Number(hasVariants)
      ? schema.required(strings.add_product.form.sku_required)
      : schema.notRequired();
  }),
  quantity: yup.string().when('hasVariants', (hasVariants, schema) => {
    return !Number(hasVariants)
      ? schema.required(strings.add_product.form.quantity_required)
      : schema.notRequired();
  }),
  priceAmount: yup.string().when('hasVariants', (hasVariants, schema) => {
    return !Number(hasVariants)
      ? schema.required(strings.add_product.form.price_amount_required)
      : schema.notRequired();
  }),
});

const inputSize = 'lg';

const BasicInfoForm = ({ onSubmitSuccess, productId = null }: PropType) => {
  const toast = useToast();
  const { authUser } = useAuth();
  const { data: categories, isLoading: getCategoriesLoading } =
    useGetProductCategories();
  const {
    mutate: createProductWithVariants,
    isLoading: isCreatingProductWithVariants,
  } = useCreateProductWithVariants();
  const { mutate: createProduct, isLoading: isCreatingProduct } =
    useCreateProduct();
  const { mutate: updateProduct, isLoading: isUpdatingProduct } =
    useUpdateProduct();
  const { data: product, isLoading: getProductByIdLoading } =
    useGetProductById(productId);

  const handleSuccess = data => {
    toast.show({
      title: productId
        ? strings.add_product.form.product_updated_successfully_msg
        : strings.add_product.form.product_created_successfully_msg,
    });
    if (!productId) {
      onSubmitSuccess(data);
    }
  };

  const handleError = () => {
    toast.show({
      title: strings.general.something_went_wrong_error,
    });
  };

  const submitNewProduct = (values, hasVariants) => {
    if (Number(hasVariants)) {
      createProductWithVariants(
        { ...values, hasVariants: true },
        {
          onSuccess: handleSuccess,
          onError: handleError,
        },
      );
    } else {
      createProduct(values, {
        onSuccess: handleSuccess,
        onError: handleError,
      });
    }
  };

  const submitProductUpdates = values => {
    updateProduct({ id: productId, payload: values });
  };

  const onSubmit = values => {
    const { category, sku, hasVariants, quantity, priceAmount, ...theRest } =
      values;
    const payload = {
      ...theRest,
      storeId: authUser.storeId,
      categoryId: Number(category),
    };
    if (!Number(hasVariants)) {
      payload.price = {
        amount: priceAmount,
        currency: currencies.TZ.code,
      };
      payload.inventory = {
        quantity,
      };
      payload.sku = sku;
    }
    if (!productId) {
      submitNewProduct(payload, hasVariants);
    } else {
      submitProductUpdates(payload);
    }
  };

  const getInitialValues = () => {
    const payload: ProductFieldFormType = {
      category: '',
      name: '',
      desc: '',
      sku: '',
      hasVariants: '0',
      quantity: '',
      priceAmount: '',
    };
    if (product) {
      payload.name = product.name;
      payload.category = `${product.categoryId}`;
      payload.desc = product.desc;
      payload.hasVariants = product.hasVariants ? '1' : '0';
      if (!product.hasVariants && product.variants.length) {
        payload.sku = product.variants[0]?.sku;
        payload.quantity = `${product.variants[0].inventory.quantity}`;
        payload.priceAmount = `${product.variants[0].price.amount}`;
      }
    }

    return payload;
  };

  const formik = useFormik({
    initialValues: getInitialValues(),
    enableReinitialize: true,
    validationSchema: productSchema,
    onSubmit: onSubmit,
  });

  const handleHasVariantChange = value => {
    formik.setFieldValue('hasVariants', value);
    if (Number(value)) {
      formik.setFieldValue('sku', '');
      formik.setFieldValue('quantity', '');
      formik.setFieldValue('priceAmount', '');
    }
  };

  if (getCategoriesLoading || getProductByIdLoading) {
    return <LoadingSpinner h='100%' />;
  }

  return (
    <Box flex={1} px={3} pt={7} bg={'white'}>
      <ScrollView flex={1}>
        <FormControl
          mb={3}
          isInvalid={!!(formik.errors.name && formik.touched.name)}>
          <FormControl.Label>
            {strings.add_product.form.name_label}
          </FormControl.Label>
          <Input
            placeholder={strings.add_product.form.name_placeholder}
            value={formik.values.name}
            size={inputSize}
            onChangeText={formik.handleChange('name')}
          />
          <FormControl.ErrorMessage>
            {formik.errors.name}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          mb={3}
          isInvalid={!!(formik.errors.category && formik.touched.category)}>
          <FormControl.Label mb={2}>
            {strings.add_product.form.category_label}
          </FormControl.Label>
          <Select
            // @ts-ignore-next-line
            optimized={false} // see here https://github.com/GeekyAnts/NativeBase/issues/5687
            placeholder={strings.add_product.form.category_placeholder}
            onValueChange={formik.handleChange('category')}
            selectedValue={formik.values.category}
            size={inputSize}>
            {categories
              .map(category => ({
                ...category,
                label: category.name[0].toUpperCase() + category.name.slice(1),
                value: category.id,
              }))
              .map(category => (
                <Select.Item
                  label={category.label}
                  value={`${category.value}`}
                  key={category.id}
                />
              ))}
          </Select>
          <FormControl.ErrorMessage>
            {formik.errors.category}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl mb={3}>
          <FormControl.Label>
            {strings.add_product.form.description_label}
          </FormControl.Label>
          <TextArea
            placeholder={strings.add_product.form.description_placeholder}
            value={formik.values.desc}
            fontSize={14}
            onChangeText={formik.handleChange('desc')}
            autoCompleteType={'off'}
          />
        </FormControl>
        <FormControl
          isInvalid={
            !!(formik.errors.hasVariants && formik.touched.hasVariants)
          }
          mb={3}>
          <FormControl.Label mb={2}>
            {strings.add_product.form.variations_label}
          </FormControl.Label>
          <Radio.Group
            name='hasVariants'
            value={formik.values.hasVariants}
            display={'flex'}
            flexDirection={'row'}
            onChange={handleHasVariantChange}>
            <Box mr={10}>
              <Radio value='1' size={'md'} isDisabled={!!productId}>
                <Text>{strings.general.yes_option}</Text>
              </Radio>
            </Box>
            <Box>
              <Radio value='0' size={'md'} isDisabled={!!productId}>
                <Text>{strings.general.no_option}</Text>
              </Radio>
            </Box>
          </Radio.Group>
          <FormControl.ErrorMessage>
            {formik.errors.hasVariants}
          </FormControl.ErrorMessage>
        </FormControl>
        {!Number(formik.values.hasVariants) ? (
          <>
            <FormControl
              mb={3}
              isInvalid={!!(formik.errors.sku && formik.touched.sku)}>
              <FormControl.Label>
                {strings.add_product.form.sku_label}
              </FormControl.Label>
              <Input
                placeholder={strings.add_product.form.sku_placeholder}
                value={formik.values.sku}
                size={inputSize}
                onChangeText={formik.handleChange('sku')}
              />
              <FormControl.ErrorMessage>
                {formik.errors.sku}
              </FormControl.ErrorMessage>
            </FormControl>
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
                size={inputSize}
                onChangeText={formik.handleChange('quantity')}
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
                  size={inputSize}
                  flex={1}
                />
              </InputGroup>
              <FormControl.ErrorMessage>
                {formik.errors.priceAmount}
              </FormControl.ErrorMessage>
            </FormControl>
          </>
        ) : null}
      </ScrollView>
      <Flex flexDirection={'row'} w={'full'} py={2} justifyContent={'center'}>
        <Button
          variant={'solid'}
          isLoading={
            isCreatingProduct ||
            isCreatingProductWithVariants ||
            isUpdatingProduct
          }
          isLoadingText={
            productId
              ? strings.general.updating_btn_text
              : strings.general.creating_btn_text
          }
          onPress={formik.handleSubmit as any}>
          {productId
            ? strings.general.update_btn_text
            : strings.general.save_btn_text}
        </Button>
      </Flex>
    </Box>
  );
};

export { BasicInfoForm };
