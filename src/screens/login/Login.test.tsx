import React from 'react';
import { Login } from './Login';
import {
  renderApp as render,
  fireEvent,
  waitFor,
  asMock,
} from '../../utils/testUtils';
import mockAxios from 'axios';

describe('Login', () => {
  it('renders the default Login form', async () => {
    const Get = asMock(mockAxios.get);
    Get.mockResolvedValue({ data: {} });
    const screen = render(<Login navigation={''} />);
    expect(screen.getAllByRole('image')).toBeTruthy();
    expect(screen.getByTestId('zeromoja-01')).toBeTruthy();
    expect(screen.getByText('Welcome to Zeromoja')).toBeTruthy();
    expect(screen.getByText('Login to your account')).toBeTruthy();
    expect(screen.getByText('Enter your details to login')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter phone number')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    expect(screen.getByText('Keep me Login')).toBeTruthy();
    expect(screen.getByText('Forgot Password?')).toBeTruthy();
    expect(screen.getByRole('button')).toBeTruthy();
    const Post = asMock(mockAxios.post);

    Post.mockResolvedValue({
      data: { accessToken: 'fake token', firstName: 'isaac' },
    });

    fireEvent.changeText(
      screen.getByPlaceholderText('Enter phone number'),
      '0787654321',
    );
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'test@123');
    fireEvent.press(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.queryByTestId('error-message')).not.toBeTruthy();
    });
  });
});
