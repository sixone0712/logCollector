import React, { useCallback, useState } from 'react';
import { RemoteStatus } from '../types/Status';

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
    siteName: 'GKC_BQ_1',
    collectStatus: 'success',
    errorStatus: 'failure',
    crasStatus: 'success',
    versionStatus: 'success',
    isRunning: true,
  },
  {
    no: 3,
    siteName: 'GKC_BQ_2',
    collectStatus: 'notbuild',
    errorStatus: 'notbuild',
    crasStatus: 'notbuild',
    versionStatus: 'success',
    isRunning: true,
  },
  {
    no: 4,
    siteName: 'GKC_BQ_3',
    collectStatus: 'success',
    errorStatus: 'success',
    crasStatus: 'success',
    versionStatus: 'success',
    isRunning: true,
  },
  {
    no: 5,
    siteName: 'BSOT_s1',
    collectStatus: 'failure',
    errorStatus: 'success',
    crasStatus: 'failure',
    versionStatus: 'success',
    isRunning: false,
  },
  {
    no: 6,
    siteName: 'BSOT_s2',
    collectStatus: 'success',
    errorStatus: 'failure',
    crasStatus: 'success',
    versionStatus: 'success',
    isRunning: false,
  },
  {
    no: 7,
    siteName: 'BSOT_s3',
    collectStatus: 'success',
    errorStatus: 'failure',
    crasStatus: 'success',
    versionStatus: 'notbuild',
    isRunning: true,
  },
  {
    no: 8,
    siteName: 'BSOT_s8',
    collectStatus: 'notbuild',
    errorStatus: 'failure',
    crasStatus: 'success',
    versionStatus: 'success',
    isRunning: false,
  },
  {
    no: 9,
    siteName: 'BSOT_s9',
    collectStatus: 'success',
    errorStatus: 'notbuild',
    crasStatus: 'success',
    versionStatus: 'success',
    isRunning: true,
  },
  {
    no: 10,
    siteName: 'BSOT_s10',
    collectStatus: 'success',
    errorStatus: 'notbuild',
    crasStatus: 'notbuild',
    versionStatus: 'success',
    isRunning: true,
  },
  {
    no: 11,
    siteName: 'BSOT_11',
    collectStatus: 'success',
    errorStatus: 'failure',
    crasStatus: 'notbuild',
    versionStatus: 'success',
    isRunning: true,
  },
  {
    no: 12,
    siteName: 'BSOT_12',
    collectStatus: 'success',
    errorStatus: 'failure',
    crasStatus: 'success',
    versionStatus: 'success',
    isRunning: false,
  },
  {
    no: 13,
    siteName: 'BSOT_13',
    collectStatus: 'success',
    errorStatus: 'failure',
    crasStatus: 'success',
    versionStatus: 'success',
    isRunning: true,
  },
];

export default function useRemoteStatus() {
  const [remoteList, setRemoteList] = useState(data);

  const refreshRemoteList = useCallback(() => {
    // TODO:
  }, []);

  return {
    remoteList,
    setRemoteList,
    refreshRemoteList,
  };
}
