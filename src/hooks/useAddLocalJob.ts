import { notification } from 'antd';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { openNotification } from '../lib/util/notification';

interface LocalJobType {
  siteName: string;
  files: any;
}

interface LocalJobResponse {
  id: number;
}

const requestAddLocalJob = async (postData: LocalJobType) => {
  const { data } = await axios.post<LocalJobResponse>('/api/local', postData);
  return data;
};

export default function useAddLocalJob() {
  const [current, setCurrent] = useState(0);
  const [selectSite, setSelectSite] = useState<string | undefined>();
  const [uploadFiles, setUploadFiles] = useState<any>([]);
  const refAddJobFetching = useRef(false);

  const mutation = useMutation((data: LocalJobType) => requestAddLocalJob(data), {
    mutationKey: 'local/addjob',
    onSuccess: () => openNotification('success', 'Success', 'Completed to add local job'),
    onError: () => openNotification('error', 'Error', 'Failed to add local job'),
  });

  console.log('mutation.isLoading', mutation.isLoading);

  const makeRequestData = useCallback(
    () => ({
      siteName: selectSite === undefined ? '' : selectSite,
      files: uploadFiles.map((item: any) => item.file),
    }),
    [selectSite, uploadFiles]
  );

  const reqAddLocalJob = useCallback(() => {
    const reqData = makeRequestData();
    mutation.mutate(reqData);
  }, [mutation]);

  useEffect(() => {
    refAddJobFetching.current = mutation.isLoading;
  }, [mutation.isLoading]);

  return {
    current,
    setCurrent,
    selectSite,
    setSelectSite,
    uploadFiles,
    setUploadFiles,
    reqAddLocalJob,
    refAddJobFetching,
    isLoading: mutation.isLoading,
  };
}
