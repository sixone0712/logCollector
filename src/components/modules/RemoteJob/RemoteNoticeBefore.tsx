/* eslint-disable react/jsx-no-undef */
import styled from '@emotion/styled';
import { InputNumber, Row, Select, Space } from 'antd';
import Col from 'antd/lib/col';
import React, { useEffect, useState } from 'react';
import useRemoteJob from '../../../hooks/useRemoteJob';
import { BeforeUnitType } from '../../../reducers/slices/remoteJob';
import CustomIcon from '../../atoms/CustomIcon';
import { remoteNoticetitleStyle } from './RemoteNotice';

export type RemoteNoticePeriodProps = {};

export default function RemoteNoticePeriod(): JSX.Element {
  const { before, setBefore } = useRemoteJob();
  const [maxTime, setMaxTime] = useState(before.unit == 'day' ? 365 : before.unit === 'hour' ? 24 : 60);

  const setTime = (value: number) => {
    setBefore({
      ...before,
      time: value,
    });
  };

  const setUnit = (value: BeforeUnitType) => {
    setBefore({
      ...before,
      unit: value,
    });
  };

  useEffect(() => {
    switch (before.unit) {
      case 'day':
        setMaxTime(365);
        break;
      case 'hour':
        if (before.time > 24) setBefore({ ...before, time: 24 });
        setMaxTime(24);
        break;

      case 'minute':
        if (before.time > 24) setBefore({ ...before, time: 60 });
        setMaxTime(60);
        break;
    }
  }, [before.unit]);

  return (
    <Before align="top">
      <Space>
        <Space css={remoteNoticetitleStyle}>
          <CustomIcon name="prev_time" />
          <Col>Previous Data Period</Col>
        </Space>
        <InputNumber min={1} max={maxTime} defaultValue={1} value={before.time} onChange={setTime} />
        <Select value={before.unit} style={{ width: 120 }} onChange={setUnit}>
          <Select.Option value="minute">Minute</Select.Option>
          <Select.Option value="hour">Hour</Select.Option>
          <Select.Option value="day">Day</Select.Option>
        </Select>
        <Col>Before</Col>
      </Space>
    </Before>
  );
}

const Before = styled(Row)`
  font-size: 1rem;
  flex-wrap: nowrap;
  margin-top: 2rem;
`;
