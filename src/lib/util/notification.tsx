import React from 'react';
import { notification } from 'antd';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { IconType } from 'antd/lib/notification';

const DivDate = styled.div`
  text-align: right;
  font-size: 13px;
  color: gray;
`;

export interface OpenNotification {
  (type: IconType, message: string, description: string | React.ReactNode): void;
}

export const openNotification: OpenNotification = (type, message, description) => {
  if (type === 'error') {
    notification.destroy();
  }

  const now = new Date(Date.now());
  console.log(typeof now.getFullYear());
  notification[type]({
    message: message,
    description: (
      <>
        <div>{description}</div>
        <p />
        <DivDate>{dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss')}</DivDate>
      </>
    ),
    duration: type === 'error' ? 0 : 4.5,
  });
};
