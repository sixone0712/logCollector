import React from 'react';
import { css } from '@emotion/react';

export type DashBoardFooterProps = {
  children?: React.ReactNode;
};

export default function DashBoardFooter({ children }: DashBoardFooterProps) {
  return <div css={style}>Log Monitor ©2021 Created by Canon</div>;
}

const style = css``;
