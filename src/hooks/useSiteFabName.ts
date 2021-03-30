import { useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { getConfigureSitesFabsNames } from '../lib/api/axios/requests';
import { openNotification } from '../lib/util/notification';
import { RemoteJobType } from '../pages/Status/Remote/Remote';
import { remoteJobSiteSelector } from '../reducers/slices/remoteJob';
import { SiteFabName } from '../types/configure';

export function useSiteFabName(type: RemoteJobType) {
  const { isLoading, isError, data, error, status, isFetching } = useQuery<SiteFabName[]>(
    'get_site_fab_names',
    getConfigureSitesFabsNames,
    {
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchOnMount: true,
      // initialData: [],
      enabled: type === 'new',
      onError: () => {
        queryClient.setQueryData('get_site_fab_names', []);
        openNotification('error', 'Error', `Failed to get site name.`);
      },
    }
  );
  const selectSite = useSelector(remoteJobSiteSelector);
  const queryClient = useQueryClient();

  const refreshSiteFabName = useCallback(() => {
    queryClient.fetchQuery('get_site_fab_names');
  }, [queryClient]);

  const disabledSelectSite = useMemo(() => {
    if (isFetching) {
      return true;
    } else {
      if (type === 'edit') {
        return !!selectSite;
      } else {
        return false;
      }
    }
  }, [selectSite, type, isFetching]);

  return {
    disabledSelectSite,
    refreshSiteFabName,
    isFetching,
    data,
  };
}
