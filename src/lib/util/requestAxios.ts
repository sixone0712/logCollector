import Item from 'antd/lib/list/Item';
import axios, { AxiosError } from 'axios';
import { ReqPostLocalJob, ResPostLocalJob } from '../../hooks/useLocalJob';
import { ResSitesNames } from '../../types/Configure';
import { ResLocalStatus, ResRemotePlans, ResRemoteStatus } from '../../types/Status';

export const getConfigureSitesFabsNames = async () => {
  const { data } = await axios.get<ResSitesNames[]>('/api/configure/sites/names');
  return data.map((item, index) => ({
    ...item,
    key: index,
  }));
};

export const getRemoteJobStatus = async () => {
  const { data } = await axios.get<ResRemoteStatus[]>('/api/status/remote');

  return data.map((item, index) => ({
    ...item,
    key: index,
  }));
};

export const getRemotePlans = async (siteId: string | number | undefined) => {
  const { data } = await axios.get<ResRemotePlans[]>(`/api/status/remote/plans?siteid=${siteId}`);

  // return data.map((item, index) => ({
  //   ...item,
  //   key: index,
  // }));

  return data;
};

export const getLocalJobStatus = async () => {
  const { data } = await axios.get<ResLocalStatus[]>('/api/status/local');

  return data.map((item, index) => ({
    ...item,
    key: index,
  }));
};

export const postLocalJob = async (reqData: ReqPostLocalJob) => {
  const { data } = await axios.post<ResPostLocalJob>('/api/status/local', reqData);

  return data;
};
