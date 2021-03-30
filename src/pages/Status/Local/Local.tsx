import { css } from '@emotion/react';
import React from 'react';
import LocalJob from '../../../components/modules/LocalJob';
import LocalStatusTable from '../../../components/modules/LocalStatusTable';

export type LocalProps = {
  children?: React.ReactNode;
};

function Local({ children }: LocalProps) {
  return (
    <div css={style}>
      <LocalStatusTable />
    </div>
  );
}

type NewJobProps = {
  children?: React.ReactNode;
};

function NewJob({ children }: NewJobProps) {
  return (
    <div css={style}>
      <LocalJob />
    </div>
  );
}

Local.NewJob = NewJob;
export default Local;

const style = css``;
