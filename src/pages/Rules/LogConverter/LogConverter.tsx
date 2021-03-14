import { css } from '@emotion/react';
import React from 'react';
import DashBoardBreadcrumb from '../../../components/organisms/DashBoardBreadcrumb';

export type LogConverterProps = {
  children?: React.ReactNode;
};

export default function LogConverter({ children }: LogConverterProps) {
  return (
    <div css={style}>
      <DashBoardBreadcrumb />
      <div>LogConverter</div>
    </div>
  );
}

const style = css``;
