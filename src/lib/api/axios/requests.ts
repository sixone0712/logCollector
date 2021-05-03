import { LocalStatus, RemoteJobStatus, RemotePlan } from '../../../types/status';
import client from './client';
import {
  ReqPostLocalJob,
  ReqPostRemoteJob,
  ResGetRemoteJobStatus,
  ResGetRemotePlan,
  ResGetSiteName,
  ResGetLocalJobStatus,
  ResPostLocalJob,
  ResPostRemoteJob,
  ResGetRemoteJob,
  ResGetHostDBInfo,
  ReqPostHostDBInfo,
  ResGetSiteDBInfo,
  ReqPostSiteDBInfo,
  ReqPutSiteDBInfoParams,
} from './types';
import { SiteFabName } from '../../../types/configure';

export const getConfigureSitesFabsNames = async (): Promise<SiteFabName[]> => {
  const { data } = await client.get<ResGetSiteName[]>('/api/configure/sites/names');
  return data.map((item, index) => ({
    ...item,
    siteFabName: `${item.siteName}_${item.fabName}`,
  }));
};

export const getRemoteJobStatus = async (): Promise<RemoteJobStatus[]> => {
  const { data } = await client.get<ResGetRemoteJobStatus[]>('/api/status/remote');

  return data.map((item, index) => ({
    ...item,
    index: index,
    siteFabName: `${item.siteName}_${item.fabName}`,
  }));
};

export const getRemoteJob = async (id: number): Promise<ResGetRemoteJob> => {
  const { data } = await client.get<ResGetRemoteJob>(`/api/status/remote/${id}`);
  return data;
};

export const getRemotePlans = async (siteId: string | number | undefined): Promise<RemotePlan[]> => {
  const { data } = await client.get<ResGetRemotePlan[]>(`/api/status/remote/plans?siteid=${siteId}`);

  return data.map((item, index) => ({
    ...item,
    index: index,
    machineCount: item.machineNames.length,
    targetCount: item.targetNames.length,
  }));
};

export const getLocalJobStatus = async (): Promise<LocalStatus[]> => {
  const { data } = await client.get<ResGetLocalJobStatus[]>('/api/status/local');

  return data.map((item, index) => ({
    ...item,
    index: index,
    siteFabName: `${item.siteName}_${item.fabName}`,
    files: item.fileNames.length,
  }));
};

export const postLocalJob = async (reqData: ReqPostLocalJob) => {
  const { data } = await client.post<ResPostLocalJob>('/api/status/local', reqData);

  return data;
};

export const postRemoteJob = async (reqData: ReqPostRemoteJob) => {
  const { data } = await client.post<ResPostRemoteJob>('/api/status/remote', reqData);

  return data;
};

export const getHostDBInfo = async (): Promise<ResGetHostDBInfo> => {
  const { data } = await client.get<ResGetHostDBInfo>('/api/configure/host');
  return data;
};

export const postHostDBInfo = async (reqData: ReqPostHostDBInfo) => {
  const { data } = await client.post('/api/configure/host', reqData);
  return data;
};

export const getSiteDBInfo = async (): Promise<ResGetSiteDBInfo[]> => {
  const { data } = await client.get<ResGetSiteDBInfo[]>('/api/configure/sites');

  return data.map((item, index) => ({
    index: index,
    ...item,
  }));
};

export const postSiteDBInfo = async (reqData: ReqPostSiteDBInfo) => {
  const { data } = await client.post('/api/configure/sites', reqData);
  return data;
};

export const putSiteDBInfo = async ({ reqId, reqData }: ReqPutSiteDBInfoParams) => {
  const { data } = await client.put(`/api/configure/sites/${reqId}`, reqData);
  return data;
};
