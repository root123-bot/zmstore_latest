import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
  Box,
  Heading,
  Text,
  FormControl,
  Input,
  Button,
  HStack,
  Pressable,
  VStack,
  Flex,
  Select,
} from 'native-base';
import { customTheme } from '@src/theme';
import { Icon } from '@components/icon';
import {
  useCreateVariantType,
  useDeleteVariantType,
  useGetVariantTypeNames,
  useGetVariantTypes,
} from '@queries';
import { strings } from '@i18n';
import { VariantTypeTag } from './VariantTypeTag';
import { LoadingSpinner } from '@src/components/loading-spinner';
import { useConfirm } from '@src/context/ConfirmContext';

const VariantTypesForm = ({ productId }) => {
  const { data: variantTypeNames, isLoading: isLoadingVariantTypeNames } =
    useGetVariantTypeNames();
  const [form, setForm] = useState({
    show: false,
    variantName: '',
    variantNamePlaceholder: '',
    variantValues: [],
    variantValue: '',
  });
  const { confirm } = useConfirm();

  const { mutate: addVariantType } = useCreateVariantType();
  const { data: existingVariantTypes, isLoading: isLoadingVariantTypes } =
    useGetVariantTypes({ productId });
  const [availableVariantTypeNames, setAvailableVariantTypeNames] = useState(
    variantTypeNames || [],
  );
  const { mutate: deleteVariantType, isLoading: isDeletingVariant } =
    useDeleteVariantType();

  useEffect(() => {
    if (existingVariantTypes) {
      setAvailableVariantTypeNames(state =>
        state.filter(item => {
          return !existingVariantTypes.some(type => type.name === item.name);
        }),
      );
    }
  }, [existingVariantTypes]);

  useEffect(() => {
    if (variantTypeNames) {
      setAvailableVariantTypeNames(variantTypeNames);
    }
  }, [variantTypeNames]);

  useEffect(() => {
    setForm(state => ({
      ...state,
      variantName:
        availableVariantTypeNames[0] &&
        availableVariantTypeNames[0].id.toString(),
      variantNamePlaceholder:
        availableVariantTypeNames[0] && availableVariantTypeNames[0].name,
    }));
  }, [availableVariantTypeNames]);

  const onClickAddVariant = () => {
    setForm(state => ({
      ...state,
      show: !state.show,
    }));
  };

  const dismissForm = () => {
    setForm(state => ({
      ...state,
      show: !state.show,
    }));
  };

  const handleVariantNameChange = value => {
    setForm(state => ({ ...state, variantName: value }));
  };

  const handleVariantValueChange = value => {
    setForm(state => ({ ...state, variantValue: value }));
  };

  // handle variant add temporarily
  const handleTempAddVariant = () => {
    setForm(state => ({
      ...state,
      variantValues: [...state.variantValues, state.variantValue],
      variantValue: '',
    }));
  };

  const handleTempRemoveVariant = value => {
    setForm(state => ({
      ...state,
      variantValues: state.variantValues.filter(item => item !== value),
    }));
  };

  const isSubmitReady = () => !!(form.variantName && form.variantValues.length);

  const handleSubmit = () => {
    const variantType = variantTypeNames.find(
      item => item.id === Number(form.variantName),
    );
    const payload = {
      name: variantType.name,
      values: form.variantValues,
      productId,
    };
    addVariantType(payload, {
      onSuccess: () => {
        setForm(state => ({ ...state, show: !state.show }));
      },
    });
  };

  const handleDelete = item => async () => {
    const payload = {
      title: `${strings.general.delete_text}`,
      description: strings.formatString(
        strings.add_product.variant_form.remove_variant_type_confirm_text,
        item.name,
      ) as string,
    };
    const isConfirmed = await confirm(payload);
    if (isConfirmed) {
      deleteVariantType(item.id);
    }
  };

  // console.log(availableVariantTypeNames)

  return (
    <Box>
      <Box
        py={3}
        px={3}
        borderBottomColor='gray.300'
        bg='white'
        borderBottomWidth={1}>
        <Heading size='xs' mb={2}>
          {strings.add_product.variant_form.list_variations_title}
        </Heading>
        <Text>{strings.add_product.variant_form.list_variations_subtitle}</Text>
      </Box>
      {isLoadingVariantTypes || isLoadingVariantTypeNames ? (
        <LoadingSpinner h='100' />
      ) : form.show ? (
        <VStack space={5}>
          <VStack
            bg='white'
            space={2}
            py={3}
            px={3}
            borderBottomColor='gray.300'
            borderBottomWidth={1}>
            <FormControl w='60%'>
              <FormControl.Label>
                {strings.add_product.variant_form.variant_type_name_label}
              </FormControl.Label>
              <Select
                selectedValue={form.variantName}
                onValueChange={handleVariantNameChange}>
                {availableVariantTypeNames
                  .map(type => ({
                    ...type,
                    label: type.name,
                    value: `${type.id}`,
                  }))
                  .map(type => (
                    <Select.Item
                      label={type.label}
                      value={type.value}
                      key={type.value}
                    />
                  ))}
              </Select>
            </FormControl>
            <HStack space={1}>
              <FormControl w='60%'>
                <FormControl.Label>
                  {strings.add_product.variant_form.variant_type_value_label}
                </FormControl.Label>
                <Input
                  placeholder={form.variantNamePlaceholder}
                  value={form.variantValue}
                  onChangeText={handleVariantValueChange}
                  size={Platform.OS === 'ios' ? 'lg' : 'md'}
                />
              </FormControl>
              <Box display='flex' justifyContent='flex-end'>
                <Button
                  variant='outline'
                  size={Platform.OS === 'ios' ? 'sm' : 'md'}
                  onPress={handleTempAddVariant}
                  isDisabled={!form.variantValue}>
                  <Text>{strings.general.add_btn_text}</Text>
                </Button>
              </Box>
            </HStack>
            <HStack space={1} flexWrap={1} mt={5}>
              {form.variantValues.map(value => (
                <VariantTypeTag
                  label={value}
                  key={value}
                  onPressX={handleTempRemoveVariant}
                />
              ))}
            </HStack>
          </VStack>

          <Flex alignItems='center'>
            <Button.Group>
              <Button variant='outline' onPress={dismissForm}>
                {strings.general.cancel_btn_text}
              </Button>
              <Button onPress={handleSubmit} isDisabled={!isSubmitReady()}>
                {strings.add_product.variant_form.save_variant_btn_text}
              </Button>
            </Button.Group>
          </Flex>
        </VStack>
      ) : (
        <>
          {existingVariantTypes
            ? existingVariantTypes.map(item => (
                <HStack
                  py={2}
                  px={3}
                  borderBottomColor='gray.300'
                  key={item.id}
                  borderBottomWidth={1}
                  justifyContent='space-between'
                  alignItems='center'
                  bg='white'>
                  <VStack>
                    <Box mb={2}>
                      <Text fontWeight='600'>
                        {item.name}({item.values.split(',').length})
                      </Text>
                    </Box>
                    <HStack space={1} flexWrap='wrap'>
                      {item.values.split(',').map(value => (
                        <VariantTypeTag label={value} key={value} />
                      ))}
                    </HStack>
                  </VStack>
                  <Box>
                    <Button
                      px={0}
                      py={0}
                      variant='unstyled'
                      isDisabled={isDeletingVariant}
                      isLoading={isDeletingVariant}
                      onPress={handleDelete(item)}>
                      <Icon name='trash' size={20} />
                    </Button>
                  </Box>
                </HStack>
              ))
            : null}
          {availableVariantTypeNames.length ? (
            <HStack
              py={3}
              px={3}
              borderBottomColor='gray.300'
              bg='white'
              borderBottomWidth={1}>
              <Pressable onPress={onClickAddVariant}>
                <HStack justifyItems='center' space={2} alignItems='center'>
                  <Icon
                    name='add-large'
                    size={20}
                    color={customTheme.colors.primary[700]}
                  />
                  <Text fontWeight='600' color='primary.700'>
                    {strings.add_product.variant_form.add_variant_btn_text}
                  </Text>
                </HStack>
              </Pressable>
            </HStack>
          ) : null}
        </>
      )}
    </Box>
  );
};

export { VariantTypesForm };
