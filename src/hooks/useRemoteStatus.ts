import React, { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getRemoteJobStatus } from '../lib/util/requestAxios';
import { RemoteStatus } from '../types/Status';

export default function useRemoteStatus() {
  const { data: remoteList, isFetching, isError } = useQuery('get_status_remote', getRemoteJobStatus, {
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const refreshRemoteList = useCallback(() => {
    queryClient.fetchQuery('get_status_remote');
  }, [queryClient]);

  return {
    remoteList,
    isFetching,
    isError,
    refreshRemoteList,
  };
}
