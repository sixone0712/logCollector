import { css } from '@emotion/react';
import React from 'react';
import useRemoteJob from '../../../hooks/useRemoteJob';
import RemoteNoticeEmail from './RemoteNoticeEmail';
import RemoteNoticePeriod from './RemoteNoticePeriod';
import RemoteNoticeSendTime from './RemoteNoticeSendTime';
export type RemoteNoticeProps = {};

export default function RemoteNotice() {
  const { errorSummary, setErrorSummary, crasData, setCrasData, mpaVersion, setMpaVersion } = useRemoteJob();

  return (
    <>
      <RemoteNoticeSendTime />
      <RemoteNoticePeriod />
      <RemoteNoticeEmail title="Error Summary" contents={errorSummary} setContents={setErrorSummary} />
    </>
  );
}

export const remoteNoticetitleStyle = css`
  font-size: 1rem;
  min-width: 13.25rem;
`;
