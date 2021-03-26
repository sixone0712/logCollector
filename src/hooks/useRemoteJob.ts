import { Modal } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { REMOTE_STEP } from '../components/organisms/RemoteJob/RemoteJob';
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

  const onBack = useCallback(() => {
    history.push('/status/remote');
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
