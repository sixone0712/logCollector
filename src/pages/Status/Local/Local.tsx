import { css } from '@emotion/react';
import React from 'react';
import DashBoardBreadcrumb from '../../../components/organisms/DashBoardBreadcrumb';
import LocalNewJob from '../../../components/organisms/LocalNewJob';
import LocalStatusTable from '../../../components/organisms/LocalStatusTable';

export type LocalProps = {
  children?: React.ReactNode;
};

function Local({ children }: LocalProps) {
  return (
    <div css={style}>
      <DashBoardBreadcrumb />
      <LocalStatusTable />
    </div>
  );
}

export type LocalJobProps = {
  children?: React.ReactNode;
};

function Job({ children }: LocalJobProps) {
  return (
    <div css={style}>
      <DashBoardBreadcrumb />
      <LocalNewJob />
    </div>
  );
}

Local.Job = Job;
export default Local;

const style = css``;
