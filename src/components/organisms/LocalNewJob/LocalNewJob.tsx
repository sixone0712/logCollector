import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Button, Col, PageHeader, Row } from 'antd';
import React, { useCallback, useState } from 'react';
import LocalConfigure from './LocalConfigure';
import LocalStep from './LocalStep';
import LocalStepButton from './LocalStepButton';

export type LocalNewJobProps = {
  children?: React.ReactNode;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Content = styled(Row)`
  margin-left: 1.75rem;
  margin-right: 1.75rem;
  margin-top: 1.875rem;
  flex-wrap: nowrap;
`;

const LocalStepContent = styled(Col)`
  margin-left: 11rem;
  height: 28.125rem;
`;

export const LOCAL_STEP = {
  CONFIGURE: 0,
  CONFIRM: 1,
  ADD: 2,
};

export default function LocalNewJob({ children }: LocalNewJobProps): JSX.Element {
  const [current, setCurrent] = useState(0);

  return (
    <Container>
      <PageHeader onBack={() => null} title="Title" />
      <Content>
        <LocalStep current={current} />
        <LocalStepContent>
          <LocalConfigure />
        </LocalStepContent>
      </Content>
      <LocalStepButton current={current} setCurrent={setCurrent} />
    </Container>
  );
}

const style = css``;
