import { DesktopOutlined, NotificationOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Col, PageHeader, Row, Space } from 'antd';
import React, { useState } from 'react';
import StepButton from '../../atoms/StepButton';
import LocalConfirm from './LocalConfirm';
import LocalConfigure from './LocalConfigure';
import LocalStep from './LocalStep';

export type LocalNewJobProps = {
  children?: React.ReactNode;
};

const Container = styled(Row)`
  /* display: flex; */
  flex-direction: column;
  background-color: white;
  width: inherit;
`;

const Contents = styled(Row)`
  /* display: flex; */
  margin-left: 1.75rem;
  margin-right: 1.75rem;
  margin-top: 1.875rem;
  flex-wrap: nowrap;
  /* flex-direction: row; */
`;

const SettingsTitle = styled(Row)`
  margin-left: 1rem;
  font-size: 1.125rem;
`;

const Main = styled(Col)`
  padding-top: 2.125rem;
  margin-left: 3rem;
`;

const Settings = styled(Col)`
  /* margin-left: 11rem; */
  height: 28.125rem;
  width: 67.1875rem;
`;

export const LOCAL_STEP = {
  CONFIGURE: 0,
  CONFIRM: 1,
};

export default function LocalNewJob({ children }: LocalNewJobProps): JSX.Element {
  const [current, setCurrent] = useState(0);

  return (
    <Container>
      <PageHeader onBack={() => null} title="SettingsTitle" />
      <Contents>
        <LocalStep current={current} />
        <Settings>
          <SettingsTitle justify="space-between" align="middle">
            <Title current={current} />
            <StepButton
              current={current}
              setCurrent={setCurrent}
              lastStep={LOCAL_STEP.CONFIRM}
              lastAction={() => {
                console.log('lastAction');
              }}
            />
          </SettingsTitle>
          <Main>
            {current === LOCAL_STEP.CONFIGURE && <LocalConfigure />}
            {current > LOCAL_STEP.CONFIGURE && <LocalConfirm />}
          </Main>
        </Settings>
      </Contents>
    </Container>
  );
}

interface TitleProps {
  current: number;
}
function Title({ current }: TitleProps) {
  const { icon, text } = getTitle(current);

  return (
    <Space>
      {icon}
      <span>{text}</span>
    </Space>
  );
}

function getTitle(current: number) {
  switch (current) {
    case 0:
      return {
        icon: <DesktopOutlined />,
        text: 'Configure',
      };
    case 1:
    default:
      return {
        icon: <NotificationOutlined />,
        text: 'Check Settings',
      };
  }
}

const style = css``;
