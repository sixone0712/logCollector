/* eslint-disable react/jsx-no-undef */
import styled from '@emotion/styled';
import { InputNumber, Row, Select, Space } from 'antd';
import Col from 'antd/lib/col';
import React, { useEffect, useState } from 'react';
import useRemoteJob from '../../../hooks/useRemoteJob';
import { PrevDataPeriodUnitType } from '../../../reducers/slices/remoteJob';
import CustomIcon from '../../atoms/CustomIcon';
import { remoteNoticetitleStyle } from './RemoteNotice';

export type RemoteNoticePeriodProps = {};

export default function RemoteNoticePeriod(): JSX.Element {
  const { periodTime, setPeriodTime } = useRemoteJob();
  const [maxTime, setMaxTime] = useState(periodTime.unit == 'day' ? 365 : periodTime.unit === 'hour' ? 24 : 60);

  const setTime = (value: number) => {
    setPeriodTime({
      ...periodTime,
      time: value,
    });
  };

  const setUnit = (value: PrevDataPeriodUnitType) => {
    setPeriodTime({
      ...periodTime,
      unit: value,
    });
  };

  useEffect(() => {
    switch (periodTime.unit) {
      case 'day':
        setMaxTime(365);
        break;
      case 'hour':
        if (periodTime.time > 24) setPeriodTime({ ...periodTime, time: 24 });
        setMaxTime(24);
        break;

      case 'minute':
        if (periodTime.time > 24) setPeriodTime({ ...periodTime, time: 60 });
        setMaxTime(60);
        break;
    }
  }, [periodTime.unit]);

  return (
    <PeriodTime align="top">
      <Space>
        <Space css={remoteNoticetitleStyle}>
          <CustomIcon name="prev_time" />
          <Col>Previous Data Period</Col>
        </Space>
        <InputNumber min={1} max={maxTime} defaultValue={1} value={periodTime.time} onChange={setTime} />
        <Select value={periodTime.unit} style={{ width: 120 }} onChange={setUnit}>
          <Select.Option value="minute">Minute</Select.Option>
          <Select.Option value="hour">Hour</Select.Option>
          <Select.Option value="day">Day</Select.Option>
        </Select>
        <Col>Before</Col>
      </Space>
    </PeriodTime>
  );
}

const PeriodTime = styled(Row)`
  font-size: 1rem;
  flex-wrap: nowrap;
  margin-top: 2rem;
`;
