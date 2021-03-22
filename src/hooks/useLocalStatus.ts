import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getLocalJobStatus } from '../lib/util/requestAxios';

export default function useLocalStatus() {
  const { data: localList, isFetching, isError } = useQuery('get_status_local', getLocalJobStatus, {
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const refreshRemoteList = useCallback(() => {
    queryClient.fetchQuery('get_status_local');
  }, [queryClient]);

  return {
    localList,
    isFetching,
    isError,
    refreshRemoteList,
  };
}
