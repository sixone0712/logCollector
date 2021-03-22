import axios from 'axios';
import { SiteDB } from '../../types/ConfigDB';
import { ResJobInfo as ResRemoteJobInfo } from '../../types/Status';

export const requestSiteList = async () => {
  const { data } = await axios.get<SiteDB[]>('/api/sitelist');
  return data;
};

export const getRemoteJobList = async () => {
  const { data } = await axios.get<ResRemoteJobInfo[]>('/api/status/remote/joblist');

  return data;
};
