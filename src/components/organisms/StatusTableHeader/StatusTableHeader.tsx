import { ReloadOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Button, Col, Row, Space } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { convertRemToPixels } from '../../../lib/util/remToPixcels';
import styled from '@emotion/styled';

export type StatusHeaderProps = {
  listCount: number;
  onClickNewJob: () => void;
  onClickRefresh: () => void;
  newBtn: boolean;
  refreshBtn: boolean;
};

const Container = styled(Row)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RegisteredCount = styled(Col)`
  font-size: 1rem;
`;

const ButtonSection = styled(Col)``;

export default function StatusTableHeader({
  listCount,
  onClickNewJob,
  onClickRefresh,
  newBtn,
  refreshBtn,
}: StatusHeaderProps) {
  return (
    <Container>
      <RegisteredCount>Registered collection list : {listCount}</RegisteredCount>
      <ButtonSection>
        <Space size={convertRemToPixels(0.5)}>
          {newBtn && (
            <Button type="primary" icon={<PlusOutlined />} css={btnStyle} onClick={onClickNewJob}>
              New Job
            </Button>
          )}
          {refreshBtn && <Button type="primary" icon={<ReloadOutlined />} css={btnStyle} onClick={onClickRefresh} />}
        </Space>
      </ButtonSection>
    </Container>
  );
}

const btnStyle = css`
  border-radius: 0.625rem;
`;
