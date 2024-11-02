import { useMutation, useQueryClient, QueryKey } from 'react-query';

type InvalidateQueryKey = string | QueryKey;

interface UseAthleteMutationParams<TData, TVariables> {
    mutationFn: (data: TVariables) => Promise<TData>;
    invalidateQueriesOnSuccess?: InvalidateQueryKey[];
}

export const useAthleteMutation = <TData, TVariables>({
    mutationFn,
    invalidateQueriesOnSuccess = [],
  }: UseAthleteMutationParams<TData, TVariables>) => {
  
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>(mutationFn, {
    onSuccess: () => {
      invalidateQueriesOnSuccess.forEach(query => queryClient.invalidateQueries(query as QueryKey));
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
  });
};
