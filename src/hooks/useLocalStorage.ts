import {useCallback} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

export const useLocalStorage = () => {
  const setItem = useCallback(async (key: string, valueToStore: string) => {
    // Save to local storage
    await EncryptedStorage.setItem(key, valueToStore);
  }, []);

  const getItem = useCallback(async (key: string) => {
    return await EncryptedStorage.getItem(key);
  }, []);

  const removeItem = useCallback(async (keyValue: string) => {
    await EncryptedStorage.removeItem(keyValue);
  }, []);

  return {getItem, setItem, removeItem};
};
