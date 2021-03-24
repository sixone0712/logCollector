import { Modal } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useIsMutating, useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LOCAL_ERROR, LOCAL_STEP } from '../components/organisms/LocalJob/LocalJob';
import { waitMutationStatus } from '../lib/util/generator';
import { openNotification } from '../lib/util/notification';
import { postLocalJob } from '../lib/util/requestAxios';
import { selectSiteAction, localJobSiteSelector, initLocalJobAction } from '../reducers/slices/localJob';
import useUploadFiles from './useUploadFiles';

export interface ReqPostLocalJob {
  site_id: number;
  filename: any;
}

export interface ResPostLocalJob {
  id: number;
}

export default function useLocalJob() {
  const [current, setCurrent] = useState(0);
  const selectSite = useSelector(localJobSiteSelector);
  const isMutating = useIsMutating({ mutationKey: ['add_local_job'] });
  const isMutatingRef = useRef(false);
  const dispatch = useDispatch();
  const history = useHistory();

  // TODO: There is an error that cannot save the filelist of the upload component of antd to the store of redux.
  // Alternatively, use use-global-hook to share values between hooks.
  // In the future, you will need to move to redux when this problem is resolved.
  const { uploadFiles, setUploadFiles } = useUploadFiles();

  const setSelectSite = useCallback(
    ({ value, label }: LabeledValue) => {
      dispatch(selectSiteAction({ value, label }));
    },
    [dispatch]
  );

  const initLocalJob = useCallback(() => {
    dispatch(initLocalJobAction());
    setUploadFiles([]);
  }, [dispatch]);

  const mutation = useMutation((data: ReqPostLocalJob) => postLocalJob(data), {
    mutationKey: 'add_local_job',
    onSuccess: () => {
      openNotification('success', 'Success', 'Completed to add local job');
    },
    onError: () => {
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
  }, [mutation]);

  const onBack = useCallback(() => {
    history.push('/status/local');
  }, []);

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
        while ((result = await generator.next(isMutatingRef)) && !result.done) {
          // noting to do
        }
        onBack();
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

  const nextAction = useCallback(() => {
    switch (current) {
      case LOCAL_STEP.CONFIGURE:
        if (selectSite === undefined) {
          openWarningModal(LOCAL_ERROR.NOT_SELECTED_SITE);
          return false;
        }
        if (uploadFiles.length === 0) {
          openWarningModal(LOCAL_ERROR.NOT_UPLOADED_FILES);
          return false;
        }
        break;
      case LOCAL_STEP.CONFIRM:
        openConfirmModal();
        break;
    }
    return true;
  }, [current, selectSite, uploadFiles]);

  useEffect(() => {
    isMutatingRef.current = isMutating ? true : false;
  }, [isMutating]);

  return {
    current,
    setCurrent,
    initLocalJob,
    selectSite,
    setSelectSite,
    uploadFiles,
    setUploadFiles,
    reqAddLocalJob,
    openConfirmModal,
    openWarningModal,
    nextAction,
    onBack,
  };
}
