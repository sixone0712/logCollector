import { css } from '@emotion/react';
import React from 'react';
import DashBoardBreadcrumb from '../../components/organisms/DashBoardBreadcrumb';

export type ConfigureProps = {
  children?: React.ReactNode;
};

export default function Configure({ children }: ConfigureProps) {
  return (
    <div css={style}>
      <>
        <DashBoardBreadcrumb />
        Configure
      </>
    </div>
  );
}

const style = css``;
