import React, { useState } from 'react';
import { RemoteStatus } from '../components/organisms/StatusTable/StatusTable';

const data: RemoteStatus[] = [
  {
    no: 1,
    siteName: 'GKC_BQ',
    collectStatus: 'success',
    errorStatus: 'success',
    crasStatus: 'success',
    versionStatus: 'success',
    isRunning: true,
  },
  {
    no: 2,
    siteName: 'BSOT_s1',
    collectStatus: 'failure',
    errorStatus: 'success',
    crasStatus: 'failure',
    versionStatus: 'success',
    isRunning: false,
  },
  {
    no: 3,
    siteName: 'BSOT_s2',
    collectStatus: 'success',
    errorStatus: 'failure',
    crasStatus: 'success',
    versionStatus: 'success',
    isRunning: true,
  },
];

export default function useRemoteStatus() {
  const [remoteList, setRemoteList] = useState(data);

  return {
    remoteList,
    setRemoteList,
  };
}
