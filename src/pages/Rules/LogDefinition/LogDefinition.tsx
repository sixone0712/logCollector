import { css } from '@emotion/react';
import React from 'react';
import DashBoardBreadcrumb from '../../../components/organisms/DashBoardBreadcrumb';

export type LogDefinitionProps = {
  children?: React.ReactNode;
};

export default function LogDefinition({ children }: LogDefinitionProps) {
  return (
    <div css={style}>
      <DashBoardBreadcrumb />
      <div>LogDefinition</div>
    </div>
  );
}

const style = css``;
