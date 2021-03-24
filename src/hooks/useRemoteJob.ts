import { LabeledValue } from 'antd/lib/select';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
} from '../reducers/slices/remoteJob';

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

  return {
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
  };
}
