import { useMutation } from '@apollo/client/react';
import { LOGIN } from '../graphql/mutations';
import type { LoginPayload } from '../types';
import useAuthStorageContext from './useAuthStorage';
import { isAuthResult } from '../utils/typeGuards';

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN);
  const authStorage = useAuthStorageContext();

  const signIn = async ({
    username,
    password,
  }: LoginPayload): Promise<void> => {
    const { data } = await mutate({
      variables: { username, password },
    });

    if (!result.loading && data && isAuthResult(data)) {
      if (data.authenticate !== null)
        await authStorage?.setAccessToken(data.authenticate.accessToken);
    }
  };

  return [signIn, result] as const;
};

export default useSignIn;
