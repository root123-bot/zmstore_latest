import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Animated } from 'react-native';
import {
  Box,
  Pressable,
  Text,
  KeyboardAvoidingView,

} from 'native-base';
import { TabView } from 'react-native-tab-view';
import { BasicInfoForm } from './basic-info-form';
import { VariantsForm } from './variants-form';
import { useGetProductById } from '@src/queries';
import { ScreenTitleContainer } from '@src/components/ScreenTitleContainer';
import { strings } from '@i18n';

const initialLayout = {
  width: Dimensions.get('window').width,
};

const AddProduct = ({ route, navigation }) => {
  const [productId, setProductId] = useState(route.params?.productId);
  const [index, setIndex] = useState(0);
  const { data: product } = useGetProductById(productId);

  const screenTitleContainerProps = {
    leftIcon: "arrow-left",
    handleCancel: () => navigation.goBack(),
    title: productId
      ? strings.add_product.form.edit_product_form_title
      : strings.add_product.form.add_product_form_title,
  }

  const getRoutes = useCallback(() => {
    return [
      { key: 'basic', title: 'Basic', isDisabled: false },
      {
        key: 'variants',
        title: 'Variants',
        isDisabled: !product || !product.hasVariants,
      },
      { key: 'images', title: 'Images', isDisabled: !product },
    ];
  }, [product]);

  const [routes, setRoutes] = useState(getRoutes());

  useEffect(() => {
    if (product) {
      setRoutes(getRoutes());
    }
  }, [product, getRoutes]);

  const handleBasicSubmitSuccess = data => {
    setProductId(data.id);
    setIndex(data.hasVariants ? 1 : 2);
  };

  const renderScene = ({ route: tabRoute }) => {
    switch (tabRoute.key) {
      case 'basic':
        return (
          <BasicInfoForm
            onSubmitSuccess={handleBasicSubmitSuccess}
            productId={productId}
          />
        );
      case 'variants':
        return <VariantsForm productId={productId} />;
      case 'images':
        return (
          <Box>
            <Text>Images</Text>
          </Box>
        );
    }
  };

  const renderTabBar = props => {
    return (
      <Box flexDirection='row'>
        {props.navigationState.routes.map((tabRoute, i) => {
          const color =
            index === i ? '#000' : tabRoute.isDisabled ? '#7f7f7f' : '#1f2937';
          const borderColor = index === i ? 'primary.500' : 'gray.200';
          const fontWeight = index === i ? '600' : 'normal';
          return (
            <Box
              borderBottomWidth='3'
              key={tabRoute.key}
              borderColor={borderColor}
              flex={1}
              alignItems='center'
              p='3'>
              <Pressable
                onPress={() => {
                  if (!tabRoute.isDisabled) {
                    setIndex(i);
                  }
                }}>
                <Animated.Text
                  style={{
                    color,
                    fontWeight,
                  }}>
                  {tabRoute.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };


  return (
    <Box flex={1} safeArea>
      <KeyboardAvoidingView
        flex={1}
        _ios={{
          behavior: 'padding',
        }}
        _android={{
          behavior: 'height',
          paddingBottom: 5,
        }}>
        <ScreenTitleContainer {...screenTitleContainerProps} />
        <TabView
          navigationState={{ index, routes }}
          onIndexChange={() => { }}
          renderScene={renderScene}
          initialLayout={initialLayout}
          renderTabBar={renderTabBar}
          swipeEnabled={false}
        />
      </KeyboardAvoidingView>
    </Box>
  );
};

export { AddProduct };
