import React, { useState } from 'react';
import { css } from '@emotion/react';
import useRemoteJob from '../../../hooks/useRemoteJob';
import { Col, Row, Space, TimePicker } from 'antd';
import MarkUpTags from '../../atoms/MarkupTags';
import { ClockCircleOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
export type RemoteNoticeSendTimeProps = {};

export default function RemoteNoticeSendTime(): JSX.Element {
  const { sendingTimes, setSendingTimes } = useRemoteJob();
  const [sendingTimeMoment, setSendingTimeMoment] = useState<moment.Moment | null>(null);

  const onChangeSendTime = (value: moment.Moment | null, dateString: string) => {
    if (sendingTimes.findIndex((item) => item === dateString) === -1) setSendingTimes([...sendingTimes, dateString]);
    setSendingTimeMoment(null);
  };
  return (
    <SendingTime>
      <SendingTimeInput align="top">
        <Space css={titleStyle}>
          <ClockCircleOutlined />
          <Col>Daily Sending Time</Col>
        </Space>
        <TimePicker value={sendingTimeMoment} format="HH:mm" onChange={onChangeSendTime} />
      </SendingTimeInput>
      <SendingTimeTags>
        <MarkUpTags tags={sendingTimes} setTags={setSendingTimes} />
      </SendingTimeTags>
    </SendingTime>
  );
}

const SendingTime = styled(Row)`
  min-height: 4.625rem;
`;

const SendingTimeInput = styled(Row)`
  flex-wrap: nowrap;
`;

const SendingTimeTags = styled(Row)`
  flex-wrap: nowrap;
  margin-top: 0.5rem;
  margin-left: 13.25rem;
  width: 45rem;
`;

const titleStyle = css`
  font-size: 1rem;
  min-width: 13.25rem;
`;
