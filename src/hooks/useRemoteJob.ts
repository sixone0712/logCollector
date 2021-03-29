import { Modal } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useIsMutating, useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { REMOTE_STEP } from '../components/organisms/RemoteJob/RemoteJob';
import { postRemoteJob } from '../lib/api/axios/requests';
import { ReqPostRemoteJob } from '../lib/api/axios/types';
import { timeToSecound } from '../lib/util/conver';
import { waitMutationStatus } from '../lib/util/generator';
import { openNotification } from '../lib/util/notification';
import {
  crasDataReducer,
  EmailOptionState,
  errorSummaryReducer,
  initRemoteJobReducer,
  mpaVersionReducer,
  beforeReducer,
  BeforeState,
  remoteJobCrasDataSelector,
  remoteJobErrorSummarySelector,
  remoteJobMpaVersionSelector,
  remoteJobBeforeSelector,
  remoteJobPlansSelector,
  remoteJobSendingTimesSelector,
  remoteJobSiteSelector,
  RemoteJobState,
  selectPlansReducer,
  selectSiteReducer,
  sendingTimesReducer,
} from '../reducers/slices/remoteJob';

const REMOTE_ERROR = {
  NO_ERROR: 0,
  NOT_SELECTED_SITE: 1,
  NOT_SELECTED_PLANS: 2,
  NOT_SELECTED_SENDING_TIME: 3,
  NOT_SELECTED_PERIOD_TIME: 4,
  NOT_ADD_ERROR_SUMMARY_TO: 5,
  NOT_ADD_ERROR_SUMMARY_SUBJECT: 6,
  NOT_ADD_ERROR_SUMMARY_CONTENTS: 7,
  NOT_ADD_CRAS_DATA_TO: 8,
  NOT_ADD_CRAS_DATA_SUBJECT: 9,
  NOT_ADD_CRAS_DATA_CONTENTS: 10,
  NOT_ADD_MPA_VERSION_TO: 11,
  NOT_ADD_MPA_VERSION_SUBJECT: 12,
  NOT_ADD_MPA_VERSION_CONTENTS: 13,
} as const;

type REMOTE_ERROR = typeof REMOTE_ERROR[keyof typeof REMOTE_ERROR];

export default function useRemoteJob() {
  const [current, setCurrent] = useState(0);
  const selectSite = useSelector(remoteJobSiteSelector);
  const selectPlans = useSelector(remoteJobPlansSelector);
  const sendingTimes = useSelector(remoteJobSendingTimesSelector);
  const before = useSelector(remoteJobBeforeSelector);
  const errorSummary = useSelector(remoteJobErrorSummarySelector);
  const crasData = useSelector(remoteJobCrasDataSelector);
  const mpaVersion = useSelector(remoteJobMpaVersionSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const mutation = useMutation((data: ReqPostRemoteJob) => postRemoteJob(data), {
    mutationKey: 'add_remote_job',
    onSuccess: () => {
      openNotification('success', 'Success', 'Completed to add remote job');
    },
    onError: () => {
      openNotification('error', 'Error', 'Failed to add remote job');
    },
  });
  const isMutating = useIsMutating({ mutationKey: ['add_remote_job'] });
  const isMutatingRef = useRef(false);

  const initRemoteJob = useCallback(() => {
    dispatch(initRemoteJobReducer());
  }, [dispatch]);

  const setSelectSite = useCallback(
    ({ value, label }: LabeledValue) => {
      dispatch(selectSiteReducer({ value, label }));
    },
    [dispatch]
  );

  const setSelectPlans = useCallback(
    (value: React.Key[]) => {
      dispatch(selectPlansReducer(value));
    },
    [dispatch]
  );

  const setSendingTimes = useCallback(
    (value: string[]) => {
      dispatch(sendingTimesReducer(value));
    },
    [dispatch]
  );

  const setBefore = useCallback(
    (value: BeforeState) => {
      dispatch(beforeReducer(value));
    },
    [dispatch]
  );

  const setErrorSummary = useCallback(
    (value: EmailOptionState) => {
      dispatch(errorSummaryReducer(value));
    },
    [dispatch]
  );

  const setCrasData = useCallback(
    (value: EmailOptionState) => {
      dispatch(crasDataReducer(value));
    },
    [dispatch]
  );

  const setMpaVersion = useCallback(
    (value: EmailOptionState) => {
      dispatch(mpaVersionReducer(value));
    },
    [dispatch]
  );

  const makeRequestData = useCallback(
    (): ReqPostRemoteJob => ({
      siteId: selectSite?.value === undefined ? 0 : (selectSite.value as number),
      planIds: selectPlans as number[],
      jobType: 'remote',
      notification: {
        sendingTimes: sendingTimes,
        before: timeToSecound(before),
        isErrorSummary: errorSummary.enable,
        errorSummaryEmail: !errorSummary.enable
          ? undefined
          : {
              recipients: errorSummary.recipients,
              subject: errorSummary.subject,
              content: errorSummary.body,
            },
        isCrasData: crasData.enable,
        crasDataEmail: !crasData.enable
          ? undefined
          : {
              recipients: crasData.recipients,
              subject: crasData.subject,
              content: crasData.body,
            },
        isMpaVersion: mpaVersion.enable,
        mpaVersionEmail: !mpaVersion.enable
          ? undefined
          : {
              recipients: mpaVersion.recipients,
              subject: mpaVersion.subject,
              content: mpaVersion.body,
            },
      },
    }),
    [selectSite, selectPlans, sendingTimes, before, errorSummary, crasData, mpaVersion]
  );

  const reqAddRemoteJob = useCallback(() => {
    const reqData = makeRequestData();
    mutation.mutate(reqData);
  }, [mutation]);

  const onBack = useCallback(() => {
    history.push('/status/remote');
  }, []);

  const openConfirmModal = useCallback(() => {
    const confirm = Modal.confirm({
      className: 'add_remote_job',
      title: 'Add Remote Job',
      content: 'Are you sure to add remote job?',
      onOk: async () => {
        diableCancelBtn();
        reqAddRemoteJob();
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

  const openWarningModal = useCallback((reason: REMOTE_ERROR) => {
    const warning = Modal.warning({
      title: 'Error',
      content: getRemoteErrorMsg(reason),
    });
  }, []);

  const nextAction = useCallback(() => {
    const reason = getRemoteErrorReason({
      current,
      selectSite,
      selectPlans,
      sendingTimes,
      before,
      errorSummary,
      crasData,
      mpaVersion,
    });

    if (reason === REMOTE_ERROR.NO_ERROR) {
      if (current === REMOTE_STEP.CONFIRM) openConfirmModal();
      return true;
    } else {
      openWarningModal(reason);
      return false;
    }
  }, [current, selectSite, selectPlans, sendingTimes, before, errorSummary, crasData, mpaVersion]);

  useEffect(() => {
    isMutatingRef.current = isMutating ? true : false;
  }, [isMutating]);

  return {
    initRemoteJob,
    current,
    setCurrent,
    selectSite,
    setSelectSite,
    selectPlans,
    setSelectPlans,
    sendingTimes,
    setSendingTimes,
    before,
    setBefore,
    errorSummary,
    setErrorSummary,
    crasData,
    setCrasData,
    mpaVersion,
    setMpaVersion,
    onBack,
    nextAction,
    openConfirmModal,
  };
}

function getRemoteErrorMsg(reason: REMOTE_ERROR): string {
  switch (reason) {
    case REMOTE_ERROR.NOT_SELECTED_SITE:
      return 'Please select a site.';
    case REMOTE_ERROR.NOT_SELECTED_PLANS:
      return 'Please select plans.';
    case REMOTE_ERROR.NOT_SELECTED_SENDING_TIME:
      return 'Please add daily sending time.';
    case REMOTE_ERROR.NOT_SELECTED_PERIOD_TIME:
      return 'Please select pervious data preiod greater than 0.';
    case REMOTE_ERROR.NOT_ADD_ERROR_SUMMARY_TO:
      return 'Please add to of error summuary.';
    case REMOTE_ERROR.NOT_ADD_ERROR_SUMMARY_SUBJECT:
      return 'Please input subject of error summuary.';
    case REMOTE_ERROR.NOT_ADD_ERROR_SUMMARY_CONTENTS:
      return 'Please input contents of error summuary.';
    case REMOTE_ERROR.NOT_ADD_CRAS_DATA_TO:
      return 'Please add to of cras data.';
    case REMOTE_ERROR.NOT_ADD_CRAS_DATA_SUBJECT:
      return 'Please input subject of cras data.';
    case REMOTE_ERROR.NOT_ADD_CRAS_DATA_CONTENTS:
      return 'Please input contents of cras data.';
    case REMOTE_ERROR.NOT_ADD_MPA_VERSION_TO:
      return 'Please add to of mpa version.';
    case REMOTE_ERROR.NOT_ADD_MPA_VERSION_SUBJECT:
      return 'Please input subject of mpa version.';
    case REMOTE_ERROR.NOT_ADD_MPA_VERSION_CONTENTS:
      return 'Please input contents of mpa version.';
    default:
      return "What's error??";
  }
}

interface RemoteJobStateCurrent extends RemoteJobState {
  current: number;
}

function getRemoteErrorReason({
  current,
  selectSite,
  selectPlans,
  sendingTimes,
  before,
  errorSummary,
  crasData,
  mpaVersion,
}: RemoteJobStateCurrent): REMOTE_ERROR {
  switch (current) {
    case REMOTE_STEP.PLANS:
      if (selectSite === undefined) {
        return REMOTE_ERROR.NOT_SELECTED_SITE;
      }
      if (selectPlans.length <= 0) {
        return REMOTE_ERROR.NOT_SELECTED_PLANS;
      }
      break;
    case REMOTE_STEP.NOTICE:
      if (sendingTimes.length <= 0) {
        return REMOTE_ERROR.NOT_SELECTED_SENDING_TIME;
      }
      if (before.time <= 0) {
        return REMOTE_ERROR.NOT_SELECTED_PERIOD_TIME;
      }
      if (errorSummary.enable) {
        const { recipients: to, subject, body: contents } = errorSummary;
        if (to.length <= 0) {
          return REMOTE_ERROR.NOT_ADD_ERROR_SUMMARY_TO;
        }
        if (subject.length <= 0) {
          return REMOTE_ERROR.NOT_ADD_ERROR_SUMMARY_SUBJECT;
        }
        if (contents.length <= 0) {
          return REMOTE_ERROR.NOT_ADD_ERROR_SUMMARY_CONTENTS;
        }
      }
      if (crasData.enable) {
        const { recipients: to, subject, body: contents } = crasData;
        if (to.length <= 0) {
          return REMOTE_ERROR.NOT_ADD_CRAS_DATA_TO;
        }
        if (subject.length <= 0) {
          return REMOTE_ERROR.NOT_ADD_CRAS_DATA_SUBJECT;
        }
        if (contents.length <= 0) {
          return REMOTE_ERROR.NOT_ADD_CRAS_DATA_CONTENTS;
        }
      }
      if (mpaVersion.enable) {
        const { recipients: to, subject, body: contents } = mpaVersion;
        if (to.length < 0) {
          return REMOTE_ERROR.NOT_ADD_MPA_VERSION_TO;
        }
        if (subject.length < 0) {
          return REMOTE_ERROR.NOT_ADD_MPA_VERSION_SUBJECT;
        }
        if (contents.length < 0) {
          return REMOTE_ERROR.NOT_ADD_MPA_VERSION_CONTENTS;
        }
      }
      break;
  }

  return REMOTE_ERROR.NO_ERROR;
}
