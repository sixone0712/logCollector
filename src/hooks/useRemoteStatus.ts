import React, { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getRemoteJobList } from '../lib/util/requestAxios';
import { RemoteStatus } from '../types/Status';

export default function useRemoteStatus() {
  const { data: remoteList, isFetching, isError } = useQuery('/status/remote/get', getRemoteJobList, {
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const refreshRemoteList = useCallback(() => {
    queryClient.fetchQuery('/status/remote/get');
  }, [queryClient]);

  return {
    remoteList,
    isFetching,
    isError,
    refreshRemoteList,
  };
}
