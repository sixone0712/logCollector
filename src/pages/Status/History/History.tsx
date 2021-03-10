import React from 'react';
import { css } from '@emotion/react';
import DashBoardBreadcrumb from '../../../components/organisms/DashBoardBreadcrumb';
import { PartitionOutlined } from '@ant-design/icons';
import { useLocation, useParams } from 'react-router-dom';
import BuildHistory from '../../../components/organisms/BuildHistory';
import qs from 'qs';
export type HistoryProps = {
  children?: React.ReactNode;
};

export default function History({ children }: HistoryProps) {
  const { type, id } = useParams<{ type: string; id: string }>();
  const location = useLocation();
  const { name } = qs.parse(location.search, {
    ignoreQueryPrefix: true, // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
  });

  console.log('location', location);
  return (
    <div css={style}>
      <DashBoardBreadcrumb
        locations={['Status', 'Remote', `${name}`, getStatusTableColumnName(type)]}
        icon={<PartitionOutlined />}
      />
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
