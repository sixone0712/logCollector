import { ResSitesNames } from './../types/Configure';
import { Modal } from 'antd';
import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import { MutationStatus, QueryObserver, useIsFetching, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import { openNotification } from '../lib/util/notification';
import { waitMutationStatus } from '../lib/util/generator';
import { LOCAL_ERROR } from '../components/organisms/LocalJob/LocalJob';
import { LabeledValue } from 'antd/lib/select';
import { postLocalJob } from '../lib/util/requestAxios';

export interface ReqPostLocalJob {
  site_id: number;
  filename: any;
}

export interface ResPostLocalJob {
  id: number;
}

export default function useLocalJob() {
  const [current, setCurrent] = useState(0);
  const [selectSite, setSelectSite] = useState<LabeledValue | undefined>();
  const [selectSiteId, setSelectSiteId] = useState<number | undefined>();
  const [uploadFiles, setUploadFiles] = useState<any>([]);
  const addJobStatusRef = useRef<MutationStatus>('idle');
  const history = useHistory();

  const setSelectSiteValue = useCallback(
    ({ value, label }: LabeledValue) => {
      setSelectSite({
        value,
        label,
      });
    },
    [setSelectSite]
  );

  const mutation = useMutation((data: ReqPostLocalJob) => postLocalJob(data), {
    mutationKey: 'add_local_job',
    onSuccess: () => {
      addJobStatusRef.current = 'success';
      openNotification('success', 'Success', 'Completed to add local job');
    },
    onError: () => {
      addJobStatusRef.current = 'error';
      openNotification('error', 'Error', 'Failed to add local job');
    },
  });

  const makeRequestData = useCallback(
    () => ({
      site_id: selectSite?.value === undefined ? 0 : (selectSite.value as number),
      filename: uploadFiles.map((item: any) => item.file),
    }),
    [selectSite, uploadFiles]
  );

  const reqAddLocalJob = useCallback(() => {
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
        reqAddLocalJob();
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
    setSelectSite: setSelectSiteValue,
    selectSiteId,
    setSelectSiteId,
    uploadFiles,
    setUploadFiles,
    reqAddLocalJob,
    addJobStatusRef,
    openConfirmModal,
    openWarningModal,
  };
}
