import { useCallback, useState } from 'react';
import { useIsMutating, useMutation, useQuery, useQueryClient } from 'react-query';
import { getSiteDBInfo, postSiteDBInfo, putSiteDBInfo } from '../lib/api/axios/requests';
import { ResGetSiteDBInfo } from '../lib/api/axios/types';
import { openNotification } from '../lib/util/notification';
import { ReqPostSiteDBInfo, ReqPutSiteDBInfoParams } from './../lib/api/axios/types';

export function useSiteDBInfo() {
  const { data, isFetching, isError } = useQuery<ResGetSiteDBInfo[]>('get_config_site_db_info', getSiteDBInfo, {
    refetchOnWindowFocus: false,
    onError: () => {
      openNotification('error', 'Error', 'Failed to response setting database information.');
    },
  });
  const mutationModify = useMutation((reqData: ReqPutSiteDBInfoParams) => putSiteDBInfo(reqData), {
    mutationKey: 'modify_config_site_db_info',
    onError: () => {
      openNotification('error', 'Error', 'Failed to modify settings server info.');
    },
    onSuccess: () => {
      refreshSiteDBinfo();
    },
    onSettled: () => {
      closeEdit();
    },
  });

  const mutationAdd = useMutation((postData: ReqPostSiteDBInfo) => postSiteDBInfo(postData), {
    mutationKey: 'add_config_site_db_info',
    onError: () => {
      openNotification('error', 'Error', 'Failed to add settings server info.');
    },
    onSuccess: () => {
      refreshSiteDBinfo();
    },
    onSettled: () => {
      closeEdit();
    },
  });

  const isMutating = useIsMutating({ mutationKey: ['modify_config_site_db_info', 'add_config_site_db_info'] });
  const queryClient = useQueryClient();
  const [visibleEdit, setVisibleEdit] = useState(false);

  const openEdit = useCallback(() => {
    setVisibleEdit(true);
  }, [setVisibleEdit]);

  const closeEdit = useCallback(() => {
    setVisibleEdit(false);
  }, [setVisibleEdit]);

  const refreshSiteDBinfo = useCallback(() => {
    queryClient.fetchQuery('get_config_site_db_info');
  }, [queryClient]);

  const modifySiteDBinfo = useCallback(
    (data: ReqPutSiteDBInfoParams) => {
      mutationModify.mutate(data);
    },
    [mutationModify]
  );

  const addSiteDBinfo = useCallback(
    (data: ReqPostSiteDBInfo) => {
      mutationAdd.mutate(data);
    },
    [mutationAdd]
  );

  return {
    data,
    isFetching,
    refreshSiteDBinfo,
    isError,
    visibleEdit,
    openEdit,
    closeEdit,
    modifySiteDBinfo,
    addSiteDBinfo,
    isMutating,
  };
}
