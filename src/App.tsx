import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import { useToast } from 'native-base';
import { Onboard } from './screens/onboard';
import { Signup } from './screens/signup';
import { MerchantSignUp } from './screens/merchant-signup';
import { Loading as LoadingScreen } from './screens/loading';
import { AddProduct } from './screens/add-product';
import { MainNavigator } from './MainNavigator';
import { useAuth } from './context/AuthContext';
import { ConfirmDialog } from './components/confirm-dialog';
import { ViewProduct } from './screens/seller-product-list/ViewProduct';

export type RootStackParamList = {
  Onboard: undefined;
  MainNavigator: undefined;
  Signup: undefined;
  MerchantSignUp: undefined;
  AddProduct: { productId: number };
};

export function App() {
  const { isAuthenticated, loading, loadingError, onboarded } = useAuth();
  const toast = useToast();
  const errorToastRef = React.useRef();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    if (loadingError && !errorToastRef.current) {
      errorToastRef.current = toast.show({
        title: 'Something went wrong',
        description: (loadingError as { message: string }).message,
      });
    }
  }, [loadingError, toast]);

  const Stack = createNativeStackNavigator();

  if (loading || loadingError) {
    return (
      <LoadingScreen
        error={loadingError && (loadingError as { message: string }).message}
      />
    );
  } else {
    return (
      <>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {!onboarded && <Stack.Screen name='Onboard' component={Onboard} />}
          <Stack.Screen
            navigationKey={isAuthenticated ? 'user' : 'guest'}
            name='MainNavigator'
            component={MainNavigator}
          />
          {!isAuthenticated ? (
            <>
              <Stack.Screen name='Signup' component={Signup} />
              <Stack.Screen name='MerchantSignUp' component={MerchantSignUp} />
            </>
          ) : (
            <>
              <Stack.Screen
                name='AddProduct'
                component={AddProduct}
                options={{ title: 'Add Product' }}
              />
              <Stack.Screen
                name='ViewProduct'
                component={ViewProduct}
                options={{ title: 'View Product' }}
              />
            </>
          )}
        </Stack.Navigator>
        <ConfirmDialog />
      </>
    );
  }
}
