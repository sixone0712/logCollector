import { DatabaseOutlined, EditOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Col, Row, Space } from 'antd';
import React from 'react';
export type ConfigTitleProps = {
  children?: React.ReactNode;
  title: string;
  onClick: () => void;
};

export default function ConfigTitle({ children }: ConfigTitleProps): JSX.Element {
  return (
    <TitleSection>
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
  );
}

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

const editButtonStyle = css`
  border-radius: 0.625rem;
`;
