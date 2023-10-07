import React from 'react';
import { ZText } from './Text';
import { render } from '../../../utils/testUtils';

describe('Text field', () => {
  it('renders valid text field', () => {
    const screen = render(<ZText placeholder='First name' />);
    expect(screen.getByPlaceholderText('First name')).toBeTruthy();
  });

  it('renders invalid text field', () => {
    const screen = render(
      <ZText
        placeholder='First name'
        isInvalid
        invalidMessage='First name required'
      />,
    );
    expect(screen.getByPlaceholderText('First name')).toBeTruthy();
    expect(screen.getByText('First name required')).toBeTruthy();
  });
});
