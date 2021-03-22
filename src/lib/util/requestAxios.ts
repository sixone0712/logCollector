import axios from 'axios';
import { SiteDB } from '../../types/ConfigDB';
import { ResSitesNames } from '../../types/Configure';
import { ResLocalStatus, ResRemoteStatus } from '../../types/Status';

export const getConfigureSitesFabsNames = async () => {
  const { data } = await axios.get<ResSitesNames[]>('/api/configure/sites/names');
  return data;
};

export const getRemoteJobStatus = async () => {
  const { data } = await axios.get<ResRemoteStatus[]>('/api/status/remote');

  return data;
};

export const getLocalJobStatus = async () => {
  const { data } = await axios.get<ResLocalStatus[]>('/api/status/local');

  return data;
};
