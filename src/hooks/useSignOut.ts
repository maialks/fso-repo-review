import { useApolloClient } from '@apollo/client/react';
import useAuthStorageContext from './useAuthStorage';

const useSignOut = () => {
  const authStorage = useAuthStorageContext();
  const client = useApolloClient();

  const signOut = async (): Promise<void> => {
    await authStorage?.removeAccessToken();
    await client.clearStore();
  };

  return signOut;
};

export default useSignOut;
