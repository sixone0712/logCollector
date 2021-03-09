import React from 'react';
import { css } from '@emotion/react';
import StatusTable from '../../../components/organisms/StatusTable';

export type RemoteProps = {
  children?: React.ReactNode;
};

export default function Remote({ children }: RemoteProps) {
  return (
    <div css={style}>
      <StatusTable />
    </div>
  );
}

const style = css``;
