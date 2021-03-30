import { DesktopOutlined, ProfileOutlined, NotificationOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Col, Row, Space } from 'antd';
import React from 'react';
import useRemoteJob from '../../../hooks/useRemoteJob';
import { toCamelCase } from '../../../lib/util/conver';

export type RemoteConfirmProps = {};
// eslint-disable-next-line no-empty-pattern
export default function RemoteConfirm({}: RemoteConfirmProps): JSX.Element {
  const { selectSite, selectPlans, sendingTimes, before, errorSummary, crasData, mpaVersion } = useRemoteJob();

  return (
    <>
      <SiteName align="top">
        <Space css={spaceStyle}>
          <DesktopOutlined />
          <span>Select Site</span>
        </Space>
        <SelectedSite>{selectSite?.label}</SelectedSite>
      </SiteName>
      <Plans align="top">
        <Space css={spaceStyle}>
          <ProfileOutlined />
          <span>Select Plans</span>
        </Space>
        <SelectedPlans>{`${selectPlans.length} Plans`}</SelectedPlans>
      </Plans>
      <Notice align="top">
        <Space css={spaceStyle}>
          <NotificationOutlined />
          <span>Notice</span>
        </Space>
        <NoticeSettings>
          <Col>{sendingTimes.join(', ')}</Col>
          <Col>{`${before.time} ${toCamelCase(before.unit)} Before`}</Col>
          <Col>{convertEmailSetting(errorSummary.enable, crasData.enable, mpaVersion.enable)}</Col>
        </NoticeSettings>
      </Notice>
    </>
  );
}

function convertEmailSetting(error: boolean, cras: boolean, mpa: boolean) {
  let email = '';
  if (error) {
    if (email.length <= 0) email += 'Error Summary';
    else email += ', Error Summary';
  }

  if (cras) {
    if (email.length <= 0) email += 'Cras Data';
    else email += ', Cras Data';
  }

  if (mpa) {
    if (email.length <= 0) email += 'MPA Version';
    else email += ', MPA Version';
  }

  return email;
}

const SiteName = styled(Row)`
  font-size: 1rem;
  flex-wrap: nowrap;
`;

const Plans = styled(Row)`
  margin-top: 2rem;
  font-size: 1rem;
  flex-wrap: nowrap;
`;

const Notice = styled(Row)`
  margin-top: 2rem;
  font-size: 1rem;
  flex-wrap: nowrap;
`;

const SelectedSite = styled(Col)``;
const SelectedPlans = styled(Col)``;
const NoticeSettings = styled(Row)`
  display: flex;
  flex-direction: column;
`;

const spaceStyle = css`
  min-width: 13.25rem;
`;
