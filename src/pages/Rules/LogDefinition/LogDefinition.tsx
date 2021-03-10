import React from 'react';
import { css } from '@emotion/react';
import DashBoardBreadcrumb from '../../../components/organisms/DashBoardBreadcrumb';
import { FileProtectOutlined } from '@ant-design/icons';

export type LogDefinitionProps = {
  children?: React.ReactNode;
};

export default function LogDefinition({ children }: LogDefinitionProps) {
  return (
    <div css={style}>
      <DashBoardBreadcrumb locations={['Rules', 'Log Definition']} icon={<FileProtectOutlined />} />
      <div>LogDefinition</div>
    </div>
  );
}

const style = css``;
