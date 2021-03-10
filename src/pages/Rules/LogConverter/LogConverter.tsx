import React from 'react';
import { css } from '@emotion/react';
import DashBoardBreadcrumb from '../../../components/organisms/DashBoardBreadcrumb';
import CustomIcon from '../../../components/atoms/CustomIcon';

export type LogConverterProps = {
  children?: React.ReactNode;
};

export default function LogConverter({ children }: LogConverterProps) {
  return (
    <div css={style}>
      <DashBoardBreadcrumb locations={['Rules', 'Log Converter']} icon={<CustomIcon name="idcard" />} />
      <div>LogConverter</div>
    </div>
  );
}

const style = css``;
