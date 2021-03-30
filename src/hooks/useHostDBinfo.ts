import { useCallback, useState } from 'react';
import { useQuery, QueryClient, useQueryClient } from 'react-query';
import { getHostDBInfo } from '../lib/api/axios/requests';
import { ResGetHostDBInfo } from '../lib/api/axios/types';
import { openNotification } from '../lib/util/notification';

export function useHostDBinfo() {
  const { data, isFetching, isError } = useQuery<ResGetHostDBInfo>('get_config_host_db', getHostDBInfo, {
    refetchOnWindowFocus: false,
    onError: () => {
      openNotification('error', 'Error', 'Failed to response setting database information.');
    },
  });
  const queryClient = useQueryClient();
  const [visibleEdit, setVisibleEdit] = useState(false);

  const openEdit = useCallback(() => {
    setVisibleEdit(true);
  }, [setVisibleEdit]);

  const closeEdit = useCallback(() => {
    setVisibleEdit(false);
  }, [setVisibleEdit]);

  const refreshHostDBinfo = useCallback(() => {
    queryClient.fetchQuery('get_config_host_db');
  }, [queryClient]);

  return {
    data,
    isFetching,
    refreshHostDBinfo,
    isError,
    visibleEdit,
    setVisibleEdit,
    openEdit,
    closeEdit,
  };
}
