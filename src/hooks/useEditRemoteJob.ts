import { LabeledValue } from 'antd/lib/select';
import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getRemoteJob } from '../lib/api/axios/requests';
import { ResGetRemoteJob } from '../lib/api/axios/types';
import { secondToTime } from '../lib/util/conver';
import { openNotification } from '../lib/util/notification';
import {
  beforeReducer,
  BeforeState,
  crasDataReducer,
  EmailOptionState,
  errorSummaryReducer,
  mpaVersionReducer,
  remoteJobSiteSelector,
  selectPlansReducer,
  selectSiteReducer,
  sendingTimesReducer,
} from '../reducers/slices/remoteJob';
export default function useEditRemoteJob(type: string) {
  const selectSite = useSelector(remoteJobSiteSelector);
  const { data, isFetching, isError } = useQuery<ResGetRemoteJob>(
    ['get_remote_job', selectSite?.value],
    () => getRemoteJob(selectSite?.value as number),
    {
      enabled: !!selectSite?.value && type === 'edit',
      // retryOnMount: false,
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
      initialData: undefined,
      onError: () => {
        openNotification('error', 'Error', `Failed to get auto plan information "${selectSite?.label}".`);
      },
      onSuccess: (data) => {
        setRemoteJob(data);
      },
    }
  );
  const dispatch = useDispatch();

  const setRemoteJob = useCallback(
    (data: ResGetRemoteJob) => {
      setSelectSite({ value: data.id, label: `${data.siteName}_${data.fabName}` });
      setSelectPlans(data.planIds);
      setSendingTimes(data.sendingTimes);
      setBefore(secondToTime(data.before));
      setErrorSummary({
        enable: data.errorSummary.enable,
        recipients: data.errorSummary.recipients,
        subject: data.errorSummary.subject,
        body: data.errorSummary.body,
      });
      setCrasData({
        enable: data.crasData.enable,
        recipients: data.crasData.recipients,
        subject: data.crasData.subject,
        body: data.crasData.body,
      });
      setMpaVersion({
        enable: data.mpaVersion.enable,
        recipients: data.mpaVersion.recipients,
        subject: data.mpaVersion.subject,
        body: data.mpaVersion.body,
      });
    },
    [data]
  );

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

  return {
    isFetchingEditJob: isFetching,
  };
}
