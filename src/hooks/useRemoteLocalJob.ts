import { Modal } from 'antd';
import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import { MutationStatus, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { openNotification } from '../lib/util/notification';
import { waitMutationStatus } from '../lib/util/generator';
import { LOCAL_ERROR } from '../components/organisms/LocalJob/LocalJob';

interface RemoteJobType {
  siteName: string;
  files: any;
}

interface RemoteJobResponse {
  id: number;
}

const requestAddRemoteJob = async (postData: RemoteJobType) => {
  const { data } = await axios.post<RemoteJobResponse>('/api/local', postData);
  return data;
};

export default function useAddRemoteJob() {
  const [current, setCurrent] = useState(0);
  const [selectSite, setSelectSite] = useState<string | undefined>();
  const [uploadFiles, setUploadFiles] = useState<any>([]);
  const addJobStatusRef = useRef<MutationStatus>('idle');
  const history = useHistory();

  const mutation = useMutation((data: RemoteJobType) => requestAddRemoteJob(data), {
    mutationKey: 'local/addjob',
    onSuccess: () => {
      addJobStatusRef.current = 'success';
      console.log('local/addjob: onSuccess');
      openNotification('success', 'Success', 'Completed to add local job');
    },
    onError: () => {
      addJobStatusRef.current = 'error';
      console.log('local/addjob: onError');
      openNotification('error', 'Error', 'Failed to add local job');
    },
  });

  const makeRequestData = useCallback(
    () => ({
      siteName: selectSite === undefined ? '' : selectSite,
      files: uploadFiles.map((item: any) => item.file),
    }),
    [selectSite, uploadFiles]
  );

  const reqAddRemoteJob = useCallback(() => {
    const reqData = makeRequestData();
    mutation.mutate(reqData);
    addJobStatusRef.current = 'loading';
  }, [mutation]);

  const openConfirmModal = useCallback(() => {
    const confirm = Modal.confirm({
      className: 'add-local-job',
      title: 'Add Local Job',
      content: 'Are you sure to add local job?',
      onOk: async () => {
        diableCancelBtn();
        reqAddRemoteJob();
        const generator = waitMutationStatus();

        // wait for response
        let result;
        while ((result = await generator.next(addJobStatusRef)) && !result.done) {
          // noting to do
        }
        history.push('/status/local');
      },
    });

    const diableCancelBtn = () => {
      confirm.update({
        cancelButtonProps: {
          disabled: true,
        },
      });
    };
  }, []);

  const openWarningModal = useCallback((reason: number) => {
    let content = '';
    switch (reason) {
      case LOCAL_ERROR.NOT_SELECTED_SITE:
        content = 'Please select a site.';
        break;
      case LOCAL_ERROR.NOT_UPLOADED_FILES:
        content = 'Please load a file.';
        break;
    }

    const warning = Modal.warning({
      title: 'Error',
      content,
    });
  }, []);

  return {
    current,
    setCurrent,
    selectSite,
    setSelectSite,
    uploadFiles,
    setUploadFiles,
    reqAddRemoteJob,
    addJobStatusRef,
    openConfirmModal,
    openWarningModal,
  };
}
