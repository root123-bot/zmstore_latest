import React, { useRef } from 'react';
import { AlertDialog, Button } from 'native-base';
import { useConfirm } from '@src/context/ConfirmContext';

export const ConfirmDialog = () => {
  const { onConfirm, onCancel, confirmState } = useConfirm();
  const cancelRef = useRef(null);
  const { show, payload } = confirmState;
  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={show}>
      <AlertDialog.Content>
        {payload.title ? (
          <AlertDialog.Header pb={1} borderBottomWidth={0}>
            {payload.title}
          </AlertDialog.Header>
        ) : null}
        <AlertDialog.Body>{payload.description}</AlertDialog.Body>
        <AlertDialog.Footer py={2} borderTopWidth={0}>
          <Button
            variant='unstyled'
            onPress={onCancel}
            _text={{ color: 'gray.500', fontWeight: 600 }}>
            {payload.rejectButtonText}
          </Button>
          <Button
            variant='ghost'
            onPress={onConfirm}
            _text={{ fontWeight: 600 }}>
            {payload.confirmButtonText}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
