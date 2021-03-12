import React from 'react';
import { css } from '@emotion/react';
import DashBoardBreadcrumb from '../../../components/organisms/DashBoardBreadcrumb';
import { PartitionOutlined } from '@ant-design/icons';
import RemoteStatusTable from '../../../components/organisms/RemoteStatusTable';

export type RemoteProps = {
  children?: React.ReactNode;
};

function Remote({ children }: RemoteProps) {
  return (
    <div css={style}>
      <DashBoardBreadcrumb locations={['Status', 'Remote']} icon={<PartitionOutlined />} />
      <RemoteStatusTable />
    </div>
  );
}

export type RemoteJobProps = {
  children?: React.ReactNode;
};

function Job({ children }: RemoteJobProps) {
  return <div>Remote NewJob</div>;
}

const style = css``;

Remote.Job = Job;
export default Remote;
