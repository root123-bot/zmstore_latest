import axios from 'axios';
// import {Platform} from 'react-native';
import Config from 'react-native-config';

const baseUrl =
  Config.APP_ENV !== 'dev'
    ? Config.API_URL
    : // : Platform.OS === 'android'
      // ? 'http://192.168.1.197:4000'
      'http://localhost:4000';

const instance = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthorization = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export default instance;
