import React from 'react';
import { App } from './App';
import {
  renderApp as render,
  asMock,
  waitFor,
  screen,
} from './utils/testUtils';
import mockStorage from 'react-native-encrypted-storage';

jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
}));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('./MainNavigator', () => ({
  MainNavigator: () => {
    const { Text } = require('react-native');
    return <Text data-testid='main-navigator'>Main Navigator</Text>;
  },
}));

describe('App', () => {
  it('should render main navigator by default', async () => {
    const mockGetItem = asMock(mockStorage.getItem);
    mockGetItem
      .mockImplementationOnce(() => Promise.resolve())
      .mockImplementationOnce(() => Promise.resolve('true'));
    render(<App />);
    await waitFor(() => {
      screen.getByText('Main Navigator');
    });
  });
});
