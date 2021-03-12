import React from 'react';
import { css } from '@emotion/react';
import DashBoardBreadcrumb from '../../../components/organisms/DashBoardBreadcrumb';
import { PartitionOutlined } from '@ant-design/icons';
import LocalStatusTable from '../../../components/organisms/LocalStatusTable';

export type LocalProps = {
  children?: React.ReactNode;
};

function Local({ children }: LocalProps) {
  return (
    <div css={style}>
      <DashBoardBreadcrumb locations={['Status', 'Local']} icon={<PartitionOutlined />} />
      <LocalStatusTable />
    </div>
  );
}

export type LocalJobProps = {
  children?: React.ReactNode;
};

function Job({ children }: LocalJobProps) {
  return <div>Remote NewJob</div>;
}

Local.Job = Job;
export default Local;

const style = css``;
