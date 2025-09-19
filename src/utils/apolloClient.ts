import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { SetContextLink } from '@apollo/client/link/context';
import type { AuthStorage } from '../types';

const httpLink = new HttpLink({
  uri: Constants.expoConfig?.extra?.env?.APOLLO_URI,
});

const createApolloClient = (authStorage: AuthStorage) => {
  const authLink = new SetContextLink(async (prevContext) => {
    try {
      const token = await authStorage.getAccessToken();
      return {
        headers: {
          ...prevContext.headers,
          authorization: `Bearer ${token}`,
        },
      };
    } catch (error: unknown) {
      console.log(error);
      return { headers: prevContext.headers };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
