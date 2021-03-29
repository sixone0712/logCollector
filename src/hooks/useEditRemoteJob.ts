import { LabeledValue } from 'antd/lib/select';
import React, { useCallback, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
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
  selectPlansReducer,
  selectSiteReducer,
  sendingTimesReducer,
} from '../reducers/slices/remoteJob';
export default function useEditRemoteJob() {
  const [site, setSite] = useState<LabeledValue | undefined>();
  const queryClient = useQueryClient();
  const { data, isFetching, isError } = useQuery<ResGetRemoteJob>(
    ['get_remote_job', site?.value],
    () => getRemoteJob(site?.value as number),
    {
      enabled: !!site?.value,
      refetchOnWindowFocus: false,
      initialData: undefined,
      onError: () => {
        openNotification('error', 'Error', `Failed to get auto plan information "${site?.label}".`);
      },
      onSuccess: (data) => {
        setRemoteJob(data);
        moveToRemoteEditJob(site?.value as number);
      },
    }
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const moveToRemoteEditJob = useCallback((id: number) => {
    history.push(`/status/remote/edit/${id}`);
  }, []);

  const setEditRemoteJob = useCallback(() => {
    if (site?.value !== undefined) queryClient.fetchQuery(['get_remote_job', site?.value]);
  }, [queryClient, site]);

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

  const isEditJobFetching = useCallback(
    (siteId: number) => {
      if ((site?.value as number) === siteId) return isFetching;
      else return false;
    },
    [isFetching, site]
  );

  return {
    site,
    setSite,
    setEditRemoteJob,
    isEditJobFetching,
  };
}
