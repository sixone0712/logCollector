import React from 'react';
import { css } from '@emotion/react';
import DashBoardBreadcrumb from '../../../components/organisms/DashBoardBreadcrumb';
import { PartitionOutlined } from '@ant-design/icons';
import RemoteStatus from '../../../components/organisms/RemoteStatusTable';

export type RemoteProps = {
  children?: React.ReactNode;
};

export default function Remote({ children }: RemoteProps) {
  return (
    <div css={style}>
      <DashBoardBreadcrumb locations={['Status', 'Remote']} icon={<PartitionOutlined />} />
      <RemoteStatus />
    </div>
  );
}

const style = css``;
