import React from 'react';
import { css } from '@emotion/react';
import { PresetStatusColorType } from 'antd/lib/_util/colors';
import { blue } from '@ant-design/colors';
import { Badge } from 'antd';
import { BuildStatus } from '../../../types/Status';

export type StatusBadgeProps = {
  children?: React.ReactNode;
  type: BuildStatus;
  onClick?: () => void;
};

const converStatusType = (type: BuildStatus): { badgeStatus: PresetStatusColorType; textStatus: string } => {
  switch (type) {
    case 'success':
      return {
        badgeStatus: 'success',
        textStatus: 'Success',
      };

    case 'failure':
      return {
        badgeStatus: 'error',
        textStatus: 'failure',
      };
    case 'processing':
      return {
        badgeStatus: 'processing',
        textStatus: 'Processing',
      };
    default:
    case 'notbuild':
      return {
        badgeStatus: 'default',
        textStatus: 'Not Build',
      };
  }
};

export default function StatusBadge({ type, onClick }: StatusBadgeProps): JSX.Element {
  const { badgeStatus, textStatus } = converStatusType(type);

  return (
    <div css={containerStyle} onClick={onClick}>
      <Badge status={badgeStatus} text={textStatus} />
    </div>
  );
}

const containerStyle = css`
  &:hover {
    .ant-badge-status-text {
      color: ${blue[4]};
    }
  }
  &:active {
    .ant-badge-status-text {
      color: ${blue[6]};
    }
  }
`;
