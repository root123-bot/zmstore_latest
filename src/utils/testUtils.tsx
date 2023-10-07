import React, { FC, ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Text } from 'native-base';
import { AuthProvider, AuthContextType } from '../context/AuthContext';
import { render } from '@testing-library/react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecursivePartial } from '@src/types';

// NativeBaseProvider uses SafeAreaContext which needs initialWindowMetrics
// to be passed to the Provider while testing.
const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

type MockableFunction = (...args: any[]) => any;

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders: FC<{ children: React.ReactNode }> = ({
  children,
  auth,
}: {
  children: ReactNode;
  auth?: AuthContextType;
}) => {
  return (
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <AuthProvider isFetchEnabled={false} authState={auth}>
            {children}
          </AuthProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

const customRender = (ui: ReactElement) => render(ui, { wrapper: Providers });

const appRender = (
  ui: ReactElement,
  initialState: { auth?: RecursivePartial<AuthContextType> } = {},
) =>
  render(ui, {
    wrapper: props => (
      <AllTheProviders
        aria-label='test-provider'
        {...props}
        {...initialState}
      />
    ),
  });

export * from '@testing-library/react-native';

export { customRender as render };

export { appRender as renderApp };

// use generic constraints to restrict `mockedFunc` to be any type of function
export const asMock = <Func extends MockableFunction>(mockedFunc: Func) =>
  mockedFunc as jest.MockedFunction<typeof mockedFunc>;

export const MockedStackNavigator = ({
  component,
  params = {},
  navTo = { name: 'NavTo', content: 'NavTo' },
}) => {
  const NavTo = () => <Text>{navTo.content}</Text>;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='MockedScreen'
        component={component}
        initialParams={params}
      />
      {navTo ? <Stack.Screen name={navTo.name} component={NavTo} /> : null}
    </Stack.Navigator>
  );
};
