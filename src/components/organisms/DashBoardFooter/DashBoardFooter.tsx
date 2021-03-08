import React from 'react';
import { css } from '@emotion/react';

export type DashBoardFooterProps = {
  children?: React.ReactNode;
};

export default function DashBoardFooter({ children }: DashBoardFooterProps) {
  return <div css={style}>Log Collecter ©2021 Created by CKBS</div>;
}

const style = css``;
