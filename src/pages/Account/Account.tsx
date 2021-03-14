import { css } from '@emotion/react';
import React from 'react';
import DashBoardBreadcrumb from '../../components/organisms/DashBoardBreadcrumb';

export type AccountProps = {
  children?: React.ReactNode;
};

export default function Account({ children }: AccountProps) {
  return (
    <div css={style}>
      <>
        <DashBoardBreadcrumb />
        Account
      </>
    </div>
  );
}

const style = css``;
