import React from 'react';
import { css } from '@emotion/react';

export type RemoteNoticeProps = {
  children?: React.ReactNode;
};

export default function RemoteNotice({ children }: RemoteNoticeProps) {
  return <div css={style}>RemoteNotice</div>;
}

const style = css``;
