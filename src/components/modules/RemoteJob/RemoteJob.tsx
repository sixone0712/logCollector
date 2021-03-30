import { NotificationOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Col, PageHeader, Row, Space } from 'antd';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import useEditRemoteJob from '../../../hooks/useEditRemoteJob';
import useRemoteJob from '../../../hooks/useRemoteJob';
import { RemoteJobType } from '../../../pages/Status/Remote/Remote';
import CustomIcon from '../../atoms/CustomIcon';
import SideSteps from '../../atoms/SideSteps';
import StepButton from '../../atoms/StepButton';
import RemoteConfirm from './RemoteConfirm';
import RemoteNotice from './RemoteNotice';
import RemotePlans from './RemotePlans';

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
  /* height: 28.125rem; */
  width: 67.1875rem;
`;

export const REMOTE_STEP = {
  PLANS: 0,
  NOTICE: 1,
  CONFIRM: 2,
};

export const remoteStepList = ['Plans Setting', 'Notice Setting', 'Confirm'];

export type RemoteJobProps = {
  type: RemoteJobType;
};

export type RemoteEditParams = {
  id: string;
};

export default function RemoteJob({ type }: RemoteJobProps) {
  const { current, setCurrent, onBack, nextAction, initRemoteJob, setSelectSite } = useRemoteJob();
  const { id } = useParams<RemoteEditParams>();
  const { search } = useLocation();
  const { name } = queryString.parse(search);

  if (type === 'edit') {
    useEditRemoteJob(type);
  }

  useEffect(() => {
    if (type === 'new') initRemoteJob();
    else setSelectSite({ value: +id, label: name });
  }, [type]);

  return (
    <Container>
      <PageHeader onBack={onBack} title="Item Setting(Remote)" />
      <Contents>
        <SideSteps current={current} stepList={remoteStepList} />
        <Settings>
          <SettingsTitle justify="space-between" align="middle">
            <RemoteTitle current={current} />
            <StepButton
              current={current}
              setCurrent={setCurrent}
              lastStep={REMOTE_STEP.CONFIRM}
              nextAction={nextAction}
            />
          </SettingsTitle>
          <Main>
            {current === REMOTE_STEP.PLANS && <RemotePlans type={type} />}
            {current === REMOTE_STEP.NOTICE && <RemoteNotice />}
            {current >= REMOTE_STEP.CONFIRM && <RemoteConfirm />}
          </Main>
        </Settings>
      </Contents>
    </Container>
  );
}

interface RemoteTitleProps {
  current: number;
}
function RemoteTitle({ current }: RemoteTitleProps) {
  const { icon, text } = getRemoteTitle(current);

  return (
    <Space>
      {icon}
      <span>{text}</span>
    </Space>
  );
}

function getRemoteTitle(current: number) {
  switch (current) {
    case 0:
      return {
        icon: <CustomIcon name="plans_setting" />,
        text: 'Plans Setting',
      };
    case 1:
      return {
        icon: <NotificationOutlined />,
        text: 'Notice Settings',
      };
    case 2:
    default:
      return {
        icon: <CustomIcon name="check_setting" />,
        text: 'Check Settings',
      };
  }
}
