import React from 'react';
import { css } from '@emotion/react';
import DashBoardBreadcrumb from '../../../components/organisms/DashBoardBreadcrumb';
import { PartitionOutlined } from '@ant-design/icons';
import RemoteStatusTable from '../../../components/organisms/RemoteStatusTable';

export type RemoteProps = {
  children?: React.ReactNode;
};

export default function Remote({ children }: RemoteProps) {
  return (
    <div css={style}>
      <DashBoardBreadcrumb locations={['Status', 'Remote']} icon={<PartitionOutlined />} />
      <RemoteStatusTable />
    </div>
  );
}

const style = css``;
