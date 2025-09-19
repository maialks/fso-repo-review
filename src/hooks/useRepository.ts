import { useQuery } from '@apollo/client/react';
import type { RepositoriesResponse } from '../types';
import { GET_REPOSITORIES_BASIC } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, error, refetch } = useQuery<{
    repositories: RepositoriesResponse;
  }>(GET_REPOSITORIES_BASIC);
  return {
    repositories: data?.repositories,
    loading,
    error,
    refetch,
  };
};

export default useRepositories;
