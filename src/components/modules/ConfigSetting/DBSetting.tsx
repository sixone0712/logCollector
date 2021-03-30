import React from 'react';
import { css } from '@emotion/react';
import { Button, Col, Descriptions, Row, Space } from 'antd';
import styled from '@emotion/styled';
import { DatabaseOutlined, EditOutlined } from '@ant-design/icons';
export type ConfigureDBProps = {
  children?: React.ReactNode;
};

export default function DBSetting({ children }: ConfigureDBProps): JSX.Element {
  return (
    <DbInfo>
      <TitleSection align="middle">
        <Space css={titleStyle}>
          <DatabaseOutlined />
          <Title>Settings Database Information</Title>
        </Space>
        <Button
          type="primary"
          icon={<EditOutlined />}
          css={editButtonStyle}
          onClick={() => {
            console.log('click');
          }}
        >
          Edit
        </Button>
      </TitleSection>
      <DBInfoSection css={descriptionsStyle}>
        <Descriptions bordered column={4}>
          <Descriptions.Item label="IP Address">192.168.0.1</Descriptions.Item>
          <Descriptions.Item label="Port">8080</Descriptions.Item>
          <Descriptions.Item label="User">Administrator</Descriptions.Item>
          <Descriptions.Item label="Password">******</Descriptions.Item>
        </Descriptions>
      </DBInfoSection>
    </DbInfo>
  );
}

const DbInfo = styled(Row)`
  margin-left: 1.875rem;
  margin-right: 1.875rem;
  margin-top: 0.5rem;
  flex-direction: column;
`;
const TitleSection = styled(Row)`
  background: linear-gradient(90deg, #bae7ff 0.87%, rgba(255, 255, 255, 0) 100%);
  height: 3.125rem;
  justify-content: space-between;
`;
const Title = styled(Col)``;
const DBInfoSection = styled(Row)``;

const titleStyle = css`
  font-size: 1.125rem;
  margin-left: 0.5rem;
`;

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
