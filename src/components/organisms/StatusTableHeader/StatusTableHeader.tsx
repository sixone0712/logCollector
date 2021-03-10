import { ReloadOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Button, Col, Row, Space } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { convertRemToPixels } from '../../../lib/util/remToPixcels';
import styled from '@emotion/styled';

export type StatusHeaderProps = {
  children?: React.ReactNode;
  listCount: number;
};

const Container = styled(Row)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RegisteredCount = styled(Col)`
  font-size: 1.5rem;
`;

const ButtonSection = styled(Col)``;

export default function StatusTableHeader({ children, listCount }: StatusHeaderProps): JSX.Element {
  return (
    <Container>
      <RegisteredCount>Registered collection list : {listCount}</RegisteredCount>
      <ButtonSection>
        <Space size={convertRemToPixels(1)}>
          <Button type="primary" icon={<PlusOutlined />} css={newJobBtnStyle}>
            New Job
          </Button>
          <ReloadOutlined css={refreshBtnStyle} />
        </Space>
      </ButtonSection>
    </Container>
  );
}

const newJobBtnStyle = css`
  border-radius: 0.625rem;
`;

const refreshBtnStyle = css`
  font-size: 1rem;
`;
