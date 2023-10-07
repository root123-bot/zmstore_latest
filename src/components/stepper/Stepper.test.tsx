import React from 'react';
import { Stepper } from './Stepper';
import { render } from '../../utils/testUtils';
import { Text, View } from 'react-native';

describe('Stepper', () => {
  function MyComponent({ title }: { title: string }) {
    return (
      <View>
        <Text>{title}</Text>
      </View>
    );
  }
  const steps = [
    <MyComponent title='Component 1' />,
    <MyComponent title='Component 2' />,
  ];

  it('renders step 1 of stepper component', () => {
    const screen = render(
      <Stepper active={0} content={steps} showButton={false} />,
    );
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('Component 1')).toBeTruthy();
  });

  it('renders step 2 of stepper component', () => {
    const screen = render(
      <Stepper active={1} content={steps} showButton={false} />,
    );
    expect(screen.getByTestId('checkIcon')).toBeTruthy();
    expect(screen.getByText('Component 2')).toBeTruthy();
  });
});
