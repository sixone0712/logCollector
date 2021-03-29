import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import { getRemoteJobStatus } from '../lib/api/axios/requests';
import { RemoteJobStatus } from '../types/Status';

export default function useRemoteStatus() {
  const { data: remoteList, isFetching, isError } = useQuery<RemoteJobStatus[]>(
    'get_status_remote',
    getRemoteJobStatus,
    {
      initialData: [],
      refetchOnWindowFocus: false,
    }
  );
  const history = useHistory();
  const queryClient = useQueryClient();

  const moveToRemoteNewJob = useCallback(() => {
    history.push('/status/remote/new');
  }, []);

  const refreshRemoteList = useCallback(() => {
    queryClient.fetchQuery('get_status_remote');
  }, [queryClient]);

  return {
    remoteList,
    isFetching,
    isError,
    refreshRemoteList,
    moveToRemoteNewJob,
  };
}
