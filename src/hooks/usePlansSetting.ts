import { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { getRemotePlans } from '../lib/util/requestAxios';
import { remoteJobSiteSelector } from '../reducers/slices/remoteJob';

export interface ResAutoPlanType {
  planId: number;
  planType: string;
  ownerId: number;
  planName: string;
  fabNames: string[];
  machineNames: string[];
  categoryNames: string[];
  categoryCodes: string[];
  commands: string[];
  type: string;
  interval: number;
  description: string;
  start: string;
  from: string;
  to: string;
  lastCollection: string;
  status: string;
  detailedStatus: string;
}

const resData: ResAutoPlanType[] = [
  {
    planId: 100,
    planType: 'ftp',
    ownerId: 10001,
    planName: 'Test_FTP',
    fabNames: ['Fab2', 'Fab2'],
    machineNames: ['MPA_3', 'MPA_4'],
    categoryCodes: ['001', '002'],
    categoryNames: ['001_RUNNING_STATUS', '002_RUNNING_STATUS(event)'],
    commands: [],
    type: 'cycle',
    interval: 86400000,
    description: 'AUTO_DOWNLOAD_FTP',
    start: '20200531140000',
    from: '20200531140000',
    to: '20200531140000',
    lastCollection: '20200531140000',
    status: 'stopped',
    detailedStatus: 'collected',
  },
  {
    planId: 101,
    planType: 'vftp_comapt',
    ownerId: 10001,
    planName: 'Test_VFTP_COMPAT',
    fabNames: ['Fab2', 'Fab2'],
    machineNames: ['MPA_3', 'MPA_4'],
    categoryCodes: [],
    categoryNames: [],
    commands: ['NO_SELECTED', 'DE_TEST_PR_2nd'],
    type: 'cycle',
    interval: 86400000,
    description: 'AUTO_DOWNLOAD_VFTP_COMPAT',
    start: '20200531140000',
    from: '20200531140000',
    to: '20200531140000',
    lastCollection: '20200531140000',
    status: 'running',
    detailedStatus: 'collecting',
  },
  {
    planId: 102,
    planType: 'vftp_sss',
    ownerId: 10001,
    planName: 'Test_VFTP_SSS',
    fabNames: ['Fab2', 'Fab2'],
    machineNames: ['MPA_3', 'MPA_4'],
    categoryCodes: [],
    categoryNames: [],
    commands: ['IP_AS_RAW', 'IP_AS_RAW_ERR-DE_TEST_PR_2nd'],
    type: 'continous',
    interval: 0,
    description: 'AUTO_DOWNLOAD_VFTP_SSS',
    start: '20200531140000',
    from: '20200531140000',
    to: '20200531140000',
    lastCollection: '20200531140000',
    status: 'stopped',
    detailedStatus: 'completed',
  },
];

export interface AutoPlanType {
  key: number;
  planId: number;
  planName: string;
  planType: string;
  description: string;
  status: string;
  detailedStatus: string;
  machines: number;
  machineNames: string[];
  targets: number;
  targetNames: string[];
}

function convPlansData(resData: ResAutoPlanType[]) {
  return resData.map((item, idx) => ({
    key: idx,
    planId: item.planId,
    planName: item.planName,
    planType: item.planType,
    description: item.description,
    status: item.status,
    detailedStatus: item.detailedStatus,
    machines: item.machineNames.length,
    machineNames: item.machineNames,
    targets: item.planType === 'ftp' ? item.categoryNames.length : item.commands.length,
    targetNames: item.planType === 'ftp' ? item.categoryNames : item.commands,
  }));
}

export default function usePlansSetting() {
  const [siteId, setSiteId] = useState<number | undefined>();
  const { data: plans, isFetching, isError } = useQuery(['get_remote_plans', { siteId }], getRemotePlans, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const selectSite = useSelector(remoteJobSiteSelector);

  useEffect(() => {
    if (selectSite) {
      setSiteId(selectSite.value as number);
    }
  }, [selectSite]);

  const queryClient = useQueryClient();

  const refreshPlans = useCallback(() => {
    queryClient.fetchQuery('get_remote_plans');
  }, [queryClient]);

  return {
    plans,
    isFetching,
    refreshPlans,
    usePlansSetting,
  };
}
