import React from 'react';
import { css } from '@emotion/react';
import { Button, Col, Descriptions, Row, Space } from 'antd';
import styled from '@emotion/styled';
import { DatabaseOutlined, EditOutlined } from '@ant-design/icons';
import { useHostDBinfo } from '../../../hooks/useHostDBinfo';
import ConfigTitle from './ConfigTitle';
import EditHostDBSetting from './EditHostDBSetting';
export type HostDBSettingProps = {
  children?: React.ReactNode;
};

export default function HostDBSetting({ children }: HostDBSettingProps): JSX.Element {
  const {
    data,
    isFetching,
    isError,
    refreshHostDBinfo,
    visibleEdit,
    setVisibleEdit,
    openEdit,
    closeEdit,
  } = useHostDBinfo();

  return (
    <DbInfo>
      <ConfigTitle
        title="Settings Database Information"
        onEdit={openEdit}
        onRefresh={refreshHostDBinfo}
        disabledEdit={isError || isFetching}
        disabledRefresh={isFetching}
        loadingRefresh={isFetching}
      />
      <DBInfoSection css={descriptionsStyle}>
        <Descriptions bordered column={4}>
          <Descriptions.Item label="IP Address">
            {data?.address || (data?.address === undefined && '-')}
          </Descriptions.Item>
          <Descriptions.Item label="Port">{data?.port || (data?.address === undefined && '-')}</Descriptions.Item>
          <Descriptions.Item label="User">{data?.user || (data?.address === undefined && '-')}</Descriptions.Item>
          <Descriptions.Item label="Password">
            {data?.password || (data?.address === undefined && '-')}
          </Descriptions.Item>
        </Descriptions>
      </DBInfoSection>
      <EditHostDBSetting visible={visibleEdit} close={closeEdit} data={data} />
    </DbInfo>
  );
}

const DbInfo = styled(Row)`
  margin-left: 1.875rem;
  margin-right: 1.875rem;
  margin-top: 0.5rem;
  flex-direction: column;
`;

const DBInfoSection = styled(Row)``;

const descriptionsStyle = css`
  margin-left: 0.8rem;
  margin-right: 0.8rem;
  margin-top: 0.8rem;
  .ant-descriptions-item-label {
    width: 10.4375rem;
  }
  .ant-descriptions-item-content {
    width: 10.4375rem;
  }
`;

const editButtonStyle = css`
  border-radius: 0.625rem;
`;
