import React from 'react';
import { css } from '@emotion/react';
import DashBoardBreadcrumb from '../../../components/organisms/DashBoardBreadcrumb';
import { PartitionOutlined } from '@ant-design/icons';
import LocalStatusTable from '../../../components/organisms/LocalStatusTable';

export type LocalProps = {
  children?: React.ReactNode;
};

export default function Local({ children }: LocalProps) {
  return (
    <div css={style}>
      <DashBoardBreadcrumb locations={['Status', 'Local']} icon={<PartitionOutlined />} />
      <LocalStatusTable />
    </div>
  );
}

const style = css``;
