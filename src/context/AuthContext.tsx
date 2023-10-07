import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { setAuthorization } from '../libs/axios';
import { useGetMe } from '@queries';
import { UserType } from '../types';

export type AuthContextType = {
  loading: boolean;
  loadingError: unknown;
  authUser: UserType;
  isAuthenticated: boolean;
  onboarded: boolean;
  setAuth(user: UserType, accessToken: string): void;
};

const AuthContext = createContext<AuthContextType>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({
  children,
  isFetchEnabled = true,
  authState = {},
}) => {
  const [authUser, setAuthUser] = useState<UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getItem, setItem } = useLocalStorage();
  const [token, setToken] = useState('');
  const { data, status, error } = useGetMe({ enabled: !!token });
  const [loading, setLoading] = useState(true);
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!authUser) {
        const accessToken = await getItem('accessToken');
        const onboardedStatus = await getItem('onboarded');

        setOnboarded(onboardedStatus === 'true');
        if (accessToken) {
          setAuthorization(accessToken);
        }
        if (accessToken && isFetchEnabled) {
          setToken(accessToken);
        }
      }

      setLoading(false);
    };
    loadData();
  }, [getItem, authUser, isFetchEnabled, token]);

  useEffect(() => {
    if (status === 'success') {
      setAuthUser(data);
      setIsAuthenticated(true);
    }
    if (status === 'error') {
      setLoading(false);
    }
  }, [status, data]);

  const setAuth = useCallback(
    async (user: UserType, accessToken: string) => {
      await setItem('accessToken', accessToken);
      setAuthorization(accessToken);
      setAuthUser(user);
      setIsAuthenticated(true);
    },
    [setItem],
  );

  const value: AuthContextType = {
    loading,
    loadingError: error,
    authUser,
    isAuthenticated,
    onboarded,
    setAuth,
    ...authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
