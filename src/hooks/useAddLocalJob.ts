import { notification } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';

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

  const makeRequestData = () => ({
    siteName: selectSite === undefined ? '' : selectSite,
    files: uploadFiles.map((item: any) => item.file),
  });

  const mutation = useMutation((data: LocalJobType) => requestAddLocalJob(data), {
    onSuccess: () =>
      notification['success']({
        message: 'Success',
        description: 'Completed to add local job',
      }),
    onError: () =>
      notification['error']({
        message: 'Error',
        description: 'Failed to add local job',
      }),
  });

  const reqAddLocalJob = () => {
    const reqData = makeRequestData();
    mutation.mutate(reqData);
  };

  return {
    current,
    setCurrent,
    selectSite,
    setSelectSite,
    uploadFiles,
    setUploadFiles,
    reqAddLocalJob,
  };
}
