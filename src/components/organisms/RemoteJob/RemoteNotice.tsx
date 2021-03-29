import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Row } from 'antd';
import React from 'react';
import useRemoteJob from '../../../hooks/useRemoteJob';
import RemoteNoticeEmail from './RemoteNoticeEmail';
import RemoteNoticeBefore from './RemoteNoticeBefore';
import RemoteNoticeSendTime from './RemoteNoticeSendTime';
export type RemoteNoticeProps = {};

export default function RemoteNotice() {
  const { errorSummary, setErrorSummary, crasData, setCrasData, mpaVersion, setMpaVersion } = useRemoteJob();

  return (
    <>
      <RemoteNoticeSendTime />
      <RemoteNoticeBefore />
      <RemoteEmailSection>
        <RemoteNoticeEmail title="Error Summary" email={errorSummary} setEmail={setErrorSummary} />
        <RemoteNoticeEmail title="Cras Data" email={crasData} setEmail={setCrasData} />
        <RemoteNoticeEmail title="MPA Version" email={mpaVersion} setEmail={setMpaVersion} />
      </RemoteEmailSection>
    </>
  );
}

export const remoteNoticetitleStyle = css`
  font-size: 1rem;
  min-width: 13.25rem;
`;

const RemoteEmailSection = styled(Row)`
  margin-bottom: 2rem;
`;
