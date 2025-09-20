import { useMutation, useApolloClient } from '@apollo/client/react';
import { LOGIN } from '../graphql/mutations';
import type { LoginPayload } from '../types';
import useAuthStorageContext from './useAuthStorage';
import { isAuthResult } from '../utils/typeGuards';

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN);
  const authStorage = useAuthStorageContext();
  const client = useApolloClient();

  const signIn = async ({
    username,
    password,
  }: LoginPayload): Promise<void> => {
    try {
      const { data } = await mutate({
        variables: { username, password },
      });

      if (!result.loading && data && isAuthResult(data) && data.authenticate) {
        await authStorage?.setAccessToken(data.authenticate.accessToken);
        await client.resetStore();
      }
    } catch (error) {
      if (error && typeof error === 'object') {
        console.log(Object.keys(error));
      }
    }
  };

  return [signIn, result] as const;
};

export default useSignIn;
