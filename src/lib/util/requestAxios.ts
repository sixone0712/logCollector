import axios from 'axios';
import { SiteDB } from '../../types/ConfigDB';

export const requestSiteList = async () => {
  const { data } = await axios.get<SiteDB[]>('/api/sitelist');
  return data;
};
