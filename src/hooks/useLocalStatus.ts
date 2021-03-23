import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { openNotification } from '../lib/util/notification';
import { getLocalJobStatus } from '../lib/util/requestAxios';

export default function useLocalStatus() {
  const { data: localList, isFetching, isError } = useQuery('get_status_local', getLocalJobStatus, {
    initialData: [],
    refetchOnWindowFocus: false,
    onError: () => {
      openNotification('error', 'Error', 'Failed to response local status list');
      queryClient.setQueryData('get_status_local', []);
    },
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
