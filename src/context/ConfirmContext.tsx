/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, useContext } from 'react';
import { strings } from '@i18n';
import { createContext, useReducer } from 'react';
export const SHOW_CONFIRM = 'SHOW_CONFIRM';
export const HIDE_CONFIRM = 'HIDE_CONFIRM';

type StatePayloadType = {
  title?: string;
  description: string;
  confirmButtonText?: string;
  rejectButtonText?: string;
};

type InitialStateType = {
  show: boolean;
  payload: StatePayloadType;
};

type DispatchValueType = {
  type: string;
  payload?: StatePayloadType;
};

let resolveCallback;

export const initialState: InitialStateType = {
  show: false,
  payload: {
    title: '',
    description: '',
    confirmButtonText: strings.general.yes_option,
    rejectButtonText: strings.general.cancel_btn_text,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CONFIRM:
      return {
        show: true,
        payload: { ...state.payload, ...action.payload },
      };
    case HIDE_CONFIRM:
      return initialState;
  }
  throw Error('Unknown action: ' + action.type);
};

const ConfirmContext = createContext<
  [InitialStateType, Dispatch<DispatchValueType>]
>([initialState, (value: DispatchValueType) => {}]);

export const ConfirmProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ConfirmContext.Provider value={[state, dispatch]}>
      {children}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const [confirmState, dispatch] = useContext(ConfirmContext);
  const onConfirm = () => {
    closeConfirm();
    resolveCallback(true);
  };

  const onCancel = () => {
    closeConfirm();
    resolveCallback(false);
  };
  const confirm = (payload: StatePayloadType) => {
    dispatch({
      type: SHOW_CONFIRM,
      payload,
    });

    return new Promise((res, rej) => {
      resolveCallback = res;
    });
  };

  const closeConfirm = () => {
    dispatch({
      type: HIDE_CONFIRM,
    });
  };

  return { confirm, onConfirm, onCancel, confirmState };
};
