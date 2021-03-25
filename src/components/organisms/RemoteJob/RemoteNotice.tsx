import { css } from '@emotion/react';
import React from 'react';
import RemoteNoticeEmail from './RemoteNoticeEmail';
import RemoteNoticePeriod from './RemoteNoticePeriod';
import RemoteNoticeSendTime from './RemoteNoticeSendTime';
export type RemoteNoticeProps = {};

export default function RemoteNotice() {
  return (
    <>
      <RemoteNoticeSendTime />
      <RemoteNoticePeriod />
      <RemoteNoticeEmail title="Error Summary" />
    </>
  );
}

export const remoteNoticetitleStyle = css`
  font-size: 1rem;
  min-width: 13.25rem;
`;
