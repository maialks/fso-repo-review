import { useMutation } from '@apollo/client/react';
import { LOGIN } from '../graphql/mutations';
import { LoginPayload } from '../types';

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }: LoginPayload) => {
    const { data } = await mutate({
      variables: { username, password },
    });
    return data;
  };

  return [signIn, result] as const;
};

export default useSignIn;
