import { DatabaseOutlined, EditOutlined, ReloadOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Col, Row, Space } from 'antd';
import React from 'react';
export type ConfigTitleProps = {
  title: string;
  onEdit: () => void;
  onRefresh: () => void;
  disabledEdit: boolean;
  disabledRefresh: boolean;
  loadingRefresh: boolean;
  icon: React.ReactNode;
};

export default function ConfigTitle({
  title,
  onEdit,
  onRefresh,
  disabledEdit,
  disabledRefresh,
  loadingRefresh,
  icon,
}: ConfigTitleProps): JSX.Element {
  return (
    <TitleSection>
      <Space css={titleStyle}>
        {icon}
        <Title>{title}</Title>
      </Space>
      <Space>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          css={btnStyle}
          onClick={onRefresh}
          loading={loadingRefresh}
          disabled={disabledRefresh}
        />
        <Button type="primary" icon={<EditOutlined />} css={btnStyle} onClick={onEdit} disabled={disabledEdit}>
          Edit
        </Button>
      </Space>
    </TitleSection>
  );
}

const TitleSection = styled(Row)`
  background: linear-gradient(90deg, #bae7ff 0.87%, rgba(255, 255, 255, 0) 100%);
  height: 3.125rem;
  justify-content: space-between;
`;
const Title = styled(Col)``;

const titleStyle = css`
  font-size: 1.125rem;
  margin-left: 0.5rem;
`;

const btnStyle = css`
  border-radius: 0.625rem;
`;
