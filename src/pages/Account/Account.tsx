import React from 'react';
import { css } from '@emotion/react';
import DashBoardBreadcrumb from '../../components/organisms/DashBoardBreadcrumb';
import CustomIcon from '../../components/atoms/CustomIcon';

export type AccountProps = {
  children?: React.ReactNode;
};

export default function Account({ children }: AccountProps) {
  return (
    <div css={style}>
      <>
        <DashBoardBreadcrumb locations={['Configure']} icon={<CustomIcon name="idcard" />} />
        Account
      </>
    </div>
  );
}

const style = css``;
