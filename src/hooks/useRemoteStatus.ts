import { LabeledValue } from 'antd/lib/select';
import { type } from 'node:os';
import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import { getRemoteJobStatus } from '../lib/api/axios/requests';
import { RemoteJobStatus, RemoteStatusType } from '../types/Status';

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

  const moveToRemoteEditJob = useCallback((id: number, siteFabName: string) => {
    history.push(`/status/remote/edit/${id}?name=${siteFabName}`);
  }, []);

  const moveToRemoteHistory = useCallback((id: number, siteFabName: string, type: RemoteStatusType) => {
    history.push(`/status/remote/${type}/${id}?name=${siteFabName}`);
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
    moveToRemoteEditJob,
    moveToRemoteHistory,
  };
}
