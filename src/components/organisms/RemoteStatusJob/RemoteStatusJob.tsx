import React from 'react';
import { css } from '@emotion/react';

export type RemoteStatusJob = {
  children?: React.ReactNode;
};

export default function RemoteStatusJob({ children }: RemoteStatusJob) {
  return <div css={style}>RemoteStatusJob</div>;
}

const style = css``;
