import React from 'react';
import { css } from '@emotion/react';
import { Space } from 'antd';
import CustomIcon from '../CustomIcon';
import { green, grey, red, presetPalettes } from '@ant-design/colors';
import { BuildStatus } from '../../organisms/RemoteStatusTable/RemoteStatus';

export type StatusItemProps = {
  status: BuildStatus;
  onClick?: () => void;
};

export default function StatusItem({ status, onClick }: StatusItemProps) {
  return (
    <div onClick={onClick}>
      <Space>
        <CustomIcon name="circle" css={statusItemStyle(status)} />
        <span>{status}</span>
      </Space>
    </div>
  );
}

const statusItemStyle = (status: BuildStatus) => {
  let color = grey[4];
  if (status === 'success') color = green[5];
  else if (status === 'failure') color = red[4];
  return css`
    color: ${color};
  `;
};
