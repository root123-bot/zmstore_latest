import React from 'react';
import { App } from './App';

import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { customTheme } from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';
import { ConfirmProvider } from './context/ConfirmContext';

const queryClient = new QueryClient();

export default function Root() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ConfirmProvider>
              <App />
            </ConfirmProvider>
          </AuthProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
