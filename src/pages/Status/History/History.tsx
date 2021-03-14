import { css } from '@emotion/react';
import qs from 'qs';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import BuildHistory from '../../../components/organisms/BuildHistory';
import DashBoardBreadcrumb from '../../../components/organisms/DashBoardBreadcrumb';
export type HistoryProps = {
  children?: React.ReactNode;
};

export default function History({ children }: HistoryProps) {
  const { type, id } = useParams<{ type: string; id: string }>();
  const { search, pathname } = useLocation();
  const { name } = qs.parse(search, {
    ignoreQueryPrefix: true, // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
  });

  return (
    <div css={style}>
      <DashBoardBreadcrumb />
      <BuildHistory type={type} />
    </div>
  );
}

const style = css``;

const getStatusTableColumnName = (column: string | null | undefined) => {
  switch (column) {
    case 'collect':
      return 'Status(Collect/Convert/Insert)';
    case 'error':
      return 'Send Error Summary';
    case 'cras':
      return 'Create Cras Data';
    case 'version':
      return 'Version Check';
    default:
      return '';
  }
};
