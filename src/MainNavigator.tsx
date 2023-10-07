import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@components/icon';
import { Text, VStack } from 'native-base';
import { Home } from './screens/home';
import { Categories } from './screens/categories';
import { Cart } from './screens/cart';
import { MerchantProfile } from './screens/merchant-profile';
import { Login } from './screens/login';
import { Dashboard } from './screens/dashboard';
import { SellerProductList } from './screens/seller-product-list';
import { Orders } from './screens/orders';

import { Platform } from 'react-native';
import { customTheme } from './theme';
import { useAuth } from './context/AuthContext';

export function MainNavigator() {
  const { isAuthenticated, authUser } = useAuth();
  const color = customTheme.colors;
  const Tab = createBottomTabNavigator();

  const isGuest: boolean = !isAuthenticated;
  const isMerchant: boolean =
    isAuthenticated && authUser.userType === 'merchant';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          height: Platform.OS === 'ios' ? 80 : 75,
          paddingHorizontal: 20,
          paddingTop: Platform.OS === 'ios' ? 25 : 0,
        },
        tabBarShowLabel: false,
      }}>
      {isMerchant ? (
        <>
          <Tab.Screen
            name='Dashboard'
            component={Dashboard}
            options={{
              tabBarIcon: ({ focused }) => (
                <VStack alignItems='center' justifyContent='center' space={3}>
                  <Icon
                    name='zeromoja'
                    size={20}
                    color={focused ? color.primary[500] : color.gray[900]}
                    testID='zeromojaIcon'
                  />
                  <Text
                    variant='body'
                    color={focused ? color.primary[500] : color.gray[900]}
                    fontFamily='body'
                    fontWeight={500}>
                    Dashboard
                  </Text>
                </VStack>
              ),
            }}
          />
          <Tab.Screen
            name='Products'
            component={SellerProductList}
            options={{
              tabBarIcon: ({ focused }) => (
                <VStack alignItems='center' justifyContent='center' space={3}>
                  <Icon
                    name='parcel-large'
                    size={20}
                    color={focused ? color.primary[500] : color.gray[900]}
                    testID='productsIcon'
                  />
                  <Text
                    variant='body'
                    color={focused ? color.primary[500] : color.gray[900]}
                    fontFamily='body'
                    fontWeight={500}>
                    Products
                  </Text>
                </VStack>
              ),
            }}
          />
          <Tab.Screen
            name='Orders'
            component={Orders}
            options={{
              tabBarIcon: ({ focused }) => (
                <VStack alignItems='center' justifyContent='center' space={3}>
                  <Icon
                    name='cart-large'
                    size={20}
                    color={focused ? color.primary[500] : color.gray[900]}
                    testID='ordersIcon'
                  />
                  <Text
                    variant='body'
                    color={focused ? color.primary[500] : color.gray[900]}
                    fontFamily='body'
                    fontWeight={500}>
                    Orders
                  </Text>
                </VStack>
              ),
            }}
          />
          <Tab.Screen
            name='MerchantProfile'
            component={MerchantProfile}
            options={{
              tabBarIcon: ({ focused }) => (
                <VStack alignItems='center' justifyContent='center' space={3}>
                  <Icon
                    name='user-large'
                    size={20}
                    color={focused ? color.primary[500] : color.gray[900]}
                    testID='profileIcon'
                  />
                  <Text
                    variant='body'
                    color={focused ? color.primary[500] : color.gray[900]}
                    fontFamily='body'
                    fontWeight={500}>
                    Account
                  </Text>
                </VStack>
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name='Home'
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => (
                <VStack alignItems='center' justifyContent='center' space={3}>
                  <Icon
                    name='zeromoja'
                    size={20}
                    color={focused ? color.primary[500] : color.gray[900]}
                  />
                  <Text
                    variant='body'
                    color={focused ? color.primary[500] : color.gray[900]}
                    fontFamily='body'
                    fontWeight={500}>
                    Home
                  </Text>
                </VStack>
              ),
            }}
          />
          <Tab.Screen
            name='categories'
            component={Categories}
            options={{
              tabBarIcon: ({ focused }) => (
                <VStack alignItems='center' justifyContent='center' space={3}>
                  <Icon
                    name='category-large'
                    size={20}
                    color={focused ? color.primary[500] : color.gray[900]}
                  />
                  <Text
                    variant='body'
                    color={focused ? color.primary[500] : color.gray[900]}
                    fontFamily='body'
                    fontWeight={500}>
                    Categories
                  </Text>
                </VStack>
              ),
            }}
          />
          <Tab.Screen
            name='Cart'
            component={Cart}
            options={{
              tabBarIcon: ({ focused }) => (
                <VStack alignItems='center' justifyContent='center' space={3}>
                  <Icon
                    name='cart-large'
                    size={20}
                    color={focused ? color.primary[500] : color.gray[900]}
                  />
                  <Text
                    variant='body'
                    color={focused ? color.primary[500] : color.gray[900]}
                    fontFamily='body'
                    fontWeight={500}>
                    Cart
                  </Text>
                </VStack>
              ),
            }}
          />
          {isGuest && (
            <Tab.Screen
              name='Login'
              component={Login}
              options={{
                tabBarIcon: ({ focused }) => (
                  <VStack alignItems='center' justifyContent='center' space={3}>
                    <Icon
                      name='login-large'
                      size={20}
                      color={focused ? color.primary[500] : color.gray[900]}
                    />
                    <Text
                      variant='body'
                      color={focused ? color.primary[500] : color.gray[900]}
                      fontFamily='body'
                      fontWeight={500}>
                      Login
                    </Text>
                  </VStack>
                ),
              }}
            />
          )}
        </>
      )}
    </Tab.Navigator>
  );
}
