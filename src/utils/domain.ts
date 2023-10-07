import Config from 'react-native-config';

export const baseUrl =
  Config.APP_ENV !== 'dev' ? Config.API_URL : 'http://localhost:4000';
