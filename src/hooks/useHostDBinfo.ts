import { useCallback, useState } from 'react';
import { useQuery, QueryClient, useQueryClient, useMutation, useIsMutating } from 'react-query';
import { getHostDBInfo, postHostDBInfo } from '../lib/api/axios/requests';
import { ReqPostHostDBInfo, ResGetHostDBInfo } from '../lib/api/axios/types';
import { openNotification } from '../lib/util/notification';

export function useHostDBinfo() {
  const { data, isFetching, isError } = useQuery<ResGetHostDBInfo>('get_config_host_db', getHostDBInfo, {
    refetchOnWindowFocus: false,
    onError: () => {
      openNotification('error', 'Error', 'Failed to response setting database information.');
    },
  });
  const mutation = useMutation((postData: ReqPostHostDBInfo) => postHostDBInfo(postData), {
    mutationKey: 'modify_hostDB_info',
    onError: () => {
      openNotification('error', 'Error', 'Failed to modify settings database info.');
    },
    onSuccess: () => {
      refreshHostDBinfo();
    },
    onSettled: () => {
      closeEdit();
    },
  });
  const isMutating = useIsMutating({ mutationKey: ['modify_hostDB_info'] });
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

  const modifyHostDBinfo = useCallback(
    (data: ReqPostHostDBInfo) => {
      mutation.mutate(data);
    },
    [mutation]
  );

  return {
    data,
    isFetching,
    refreshHostDBinfo,
    isError,
    visibleEdit,
    openEdit,
    closeEdit,
    modifyHostDBinfo,
    isMutating,
  };
}
