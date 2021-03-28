import { Modal, notification } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import { useCallback, useRef, useState } from 'react';
import { useIsMutating, useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { REMOTE_STEP } from '../components/organisms/RemoteJob/RemoteJob';
import { waitMutationStatus } from '../lib/util/generator';
import { openNotification } from '../lib/util/notification';
import {
  crasDataReducer,
  EmailOptionState,
  errorSummaryReducer,
  mpaVersionReducer,
  periodTimeReducer,
  PrevDataPeriodState,
  remoteJobCrasDataSelector,
  remoteJobErrorSummarySelector,
  remoteJobMpaVersionSelector,
  remoteJobPeriodTimeSelector,
  remoteJobPlansSelector,
  remoteJobSendingTimesSelector,
  remoteJobSiteSelector,
  selectPlansReducer,
  selectSiteReducer,
  sendingTimesReducer,
  initRemoteJobReducer,
} from '../reducers/slices/remoteJob';

const REMOTE_ERROR = {
  NOT_SELECTED_SITE: 0,
  NOT_SELECTED_PLANS: 1,
  NOT_SELECTED_SENDING_TIME: 2,
  NOT_SELECTED_PERIOD_TIME: 3,
  NOT_ADD_ERROR_SUMMARY_TO: 4,
  NOT_ADD_ERROR_SUMMARY_SUBJECT: 5,
  NOT_ADD_ERROR_SUMMARY_CONTENTS: 6,
  NOT_ADD_CRAS_DATA_TO: 7,
  NOT_ADD_CRAS_DATA_SUBJECT: 8,
  NOT_ADD_CRAS_DATA_CONTENTS: 9,
  NOT_ADD_MPA_VERSION_TO: 10,
  NOT_ADD_MPA_VERSION_SUBJECT: 11,
  NOT_ADD_MPA_VERSION_CONTENTS: 12,
} as const;

type REMOTE_ERROR = typeof REMOTE_ERROR[keyof typeof REMOTE_ERROR];

interface REMOTE_NOTIFICATION {
  recipient: string[];
  subject: string;
  content: string;
}
interface REQ_REMOTE_JOB {
  site_id: number;
  plans_id: number[];
  job_type: string;
  notification: {
    error_summary: boolean;
    cras: boolean;
    version: boolean;
    sending_time: string[];
    before: number;
    error_email?: REMOTE_NOTIFICATION | null;
    cras_email?: REMOTE_NOTIFICATION | null;
    version_email?: REMOTE_NOTIFICATION | null;
  };
}

export default function useRemoteJob() {
  const [current, setCurrent] = useState(0);
  const selectSite = useSelector(remoteJobSiteSelector);
  const selectPlans = useSelector(remoteJobPlansSelector);
  const sendingTimes = useSelector(remoteJobSendingTimesSelector);
  const periodTime = useSelector(remoteJobPeriodTimeSelector);
  const errorSummary = useSelector(remoteJobErrorSummarySelector);
  const crasData = useSelector(remoteJobCrasDataSelector);
  const mpaVersion = useSelector(remoteJobMpaVersionSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const mutation = useMutation((data: ReqPostLocalJob) => postLocalJob(data), {
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

  const setPeriodTime = useCallback(
    (value: PrevDataPeriodState) => {
      dispatch(periodTimeReducer(value));
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
    (): REQ_REMOTE_JOB => ({
      site_id: selectSite?.value === undefined ? 0 : (selectSite.value as number),
      plans_id: selectPlans as number[],
      job_type: 'remote',
      notification: {
        sending_time: sendingTimes,
        before: periodTime.time,
        error_summary: errorSummary.enable,
        error_email: !errorSummary.enable
          ? undefined
          : {
              recipient: errorSummary.to,
              subject: errorSummary.subject,
              content: errorSummary.contents,
            },
        cras: crasData.enable,
        cras_email: !crasData.enable
          ? undefined
          : {
              recipient: crasData.to,
              subject: crasData.subject,
              content: crasData.contents,
            },
        version: mpaVersion.enable,
        version_email: !mpaVersion.enable
          ? undefined
          : {
              recipient: mpaVersion.to,
              subject: mpaVersion.subject,
              content: mpaVersion.contents,
            },
      },
    }),
    [selectSite, selectPlans, sendingTimes, periodTime, errorSummary, crasData, mpaVersion]
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
      className: 'add-local-job',
      title: 'Add Remote Job',
      content: 'Are you sure to add local job?',
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
    switch (current) {
      case REMOTE_STEP.PLANS:
        if (selectSite === undefined) {
          openWarningModal(REMOTE_ERROR.NOT_SELECTED_SITE);
          return false;
        }
        if (selectPlans.length <= 0) {
          openWarningModal(REMOTE_ERROR.NOT_SELECTED_PLANS);
          return false;
        }
        break;
      case REMOTE_STEP.NOTICE:
        if (sendingTimes.length <= 0) {
          openWarningModal(REMOTE_ERROR.NOT_SELECTED_SENDING_TIME);
          return false;
        }
        if (periodTime.time <= 0) {
          openWarningModal(REMOTE_ERROR.NOT_SELECTED_PERIOD_TIME);
          return false;
        }
        if (errorSummary.enable) {
          const { to, subject, contents } = errorSummary;
          if (to.length <= 0) {
            openWarningModal(REMOTE_ERROR.NOT_ADD_ERROR_SUMMARY_TO);
            return false;
          }
          if (subject.length <= 0) {
            openWarningModal(REMOTE_ERROR.NOT_ADD_ERROR_SUMMARY_SUBJECT);
            return false;
          }
          if (contents.length <= 0) {
            openWarningModal(REMOTE_ERROR.NOT_ADD_ERROR_SUMMARY_CONTENTS);
            return false;
          }
        }
        if (crasData.enable) {
          const { to, subject, contents } = crasData;
          if (to.length <= 0) {
            openWarningModal(REMOTE_ERROR.NOT_ADD_CRAS_DATA_TO);
            return false;
          }
          if (subject.length <= 0) {
            openWarningModal(REMOTE_ERROR.NOT_ADD_CRAS_DATA_SUBJECT);
            return false;
          }
          if (contents.length <= 0) {
            openWarningModal(REMOTE_ERROR.NOT_ADD_CRAS_DATA_CONTENTS);
            return false;
          }
        }
        if (mpaVersion.enable) {
          const { to, subject, contents } = mpaVersion;
          if (to.length < 0) {
            openWarningModal(REMOTE_ERROR.NOT_ADD_MPA_VERSION_TO);
            return false;
          }
          if (subject.length < 0) {
            openWarningModal(REMOTE_ERROR.NOT_ADD_MPA_VERSION_SUBJECT);
            return false;
          }
          if (contents.length < 0) {
            openWarningModal(REMOTE_ERROR.NOT_ADD_MPA_VERSION_CONTENTS);
            return false;
          }
        }
        break;
    }
    return true;
  }, [current, selectSite, selectPlans, sendingTimes, periodTime, errorSummary, crasData, mpaVersion]);

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
    periodTime,
    setPeriodTime,
    errorSummary,
    setErrorSummary,
    crasData,
    setCrasData,
    mpaVersion,
    setMpaVersion,
    onBack,
    nextAction,
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
