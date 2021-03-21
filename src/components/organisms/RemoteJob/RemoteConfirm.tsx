import React from 'react';
import { css } from '@emotion/react';

export type RemoteConfirmProps = {
  children?: React.ReactNode;
};

export default function RemoteConfirm({ children }: RemoteConfirmProps) {
  return <div css={style}>RemoteConfirm</div>;
}

const style = css``;
