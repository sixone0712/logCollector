import { useCallback, useState } from 'react';
import { LocalStatus } from '../types/Status';

const data: LocalStatus[] = [
  {
    no: 1,
    siteName: 'GKC_BQ',
    status: 'success',
  },
  {
    no: 2,
    siteName: 'GKC_BQ_1',
    status: 'success',
  },
  {
    no: 3,
    siteName: 'GKC_BQ_2',
    status: 'notbuild',
  },
  {
    no: 4,
    siteName: 'GKC_BQ_3',
    status: 'failure',
  },
  {
    no: 5,
    siteName: 'BSOT_s1',
    status: 'failure',
  },
  {
    no: 6,
    siteName: 'BSOT_s2',
    status: 'success',
  },
  {
    no: 7,
    siteName: 'BSOT_s3',
    status: 'failure',
  },
  {
    no: 8,
    siteName: 'BSOT_s8',
    status: 'notbuild',
  },
  {
    no: 9,
    siteName: 'BSOT_s9',
    status: 'success',
  },
  {
    no: 10,
    siteName: 'BSOT_s10',
    status: 'success',
  },
  {
    no: 11,
    siteName: 'BSOT_11',
    status: 'success',
  },
  {
    no: 12,
    siteName: 'BSOT_12',
    status: 'success',
  },
  {
    no: 13,
    siteName: 'BSOT_13',
    status: 'success',
  },
  {
    no: 14,
    siteName: 'BSOT_13',
    status: 'success',
  },
  {
    no: 15,
    siteName: 'BSOT_13',
    status: 'success',
  },
  {
    no: 16,
    siteName: 'BSOT_13',
    status: 'success',
  },
  {
    no: 17,
    siteName: 'BSOT_13',
    status: 'success',
  },
  {
    no: 18,
    siteName: 'BSOT_13',
    status: 'success',
  },
  {
    no: 19,
    siteName: 'BSOT_13',
    status: 'success',
  },
  {
    no: 20,
    siteName: 'BSOT_13',
    status: 'success',
  },
  {
    no: 21,
    siteName: 'BSOT_13',
    status: 'success',
  },
  {
    no: 22,
    siteName: 'BSOT_13',
    status: 'success',
  },
  {
    no: 23,
    siteName: 'BSOT_13',
    status: 'success',
  },
];

export default function useLocalStatus() {
  const [localList, setLocalList] = useState(data);

  const refreshRemoteList = useCallback(() => {
    // TODO:
  }, []);

  return {
    localList,
    setLocalList,
    refreshRemoteList,
  };
}
