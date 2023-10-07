import React from 'react';
import { ZTextArea } from './TextArea';
import { render } from '../../../utils/testUtils';

describe('Text Area field', () => {
  it('renders valid text area field', () => {
    const screen = render(<ZTextArea placeholder='Description' />);
    expect(screen.getByPlaceholderText('Description')).toBeTruthy();
  });

  it('renders invalid text area field', () => {
    const screen = render(
      <ZTextArea
        placeholder='Description'
        isInvalid
        invalidMessage='Description required'
      />,
    );
    expect(screen.getByPlaceholderText('Description')).toBeTruthy();
    expect(screen.getByText('Description required')).toBeTruthy();
  });
});
