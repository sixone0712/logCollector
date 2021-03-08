import React from 'react';
import { css } from '@emotion/react';
import Icon from '../Icon';
import { IconType } from '../Icon/Icon';

export type NavBarIconProps = {
  name: IconType;
  size?: string;
};

export default function NavBarIcon({ name, size = '1rem' }: NavBarIconProps) {
  return (
    <span>
      <Icon name={name} css={iconStyle(size)} />
    </span>
  );
}

const iconStyle = (size: string) => css`
  vertical-align: sub;
  margin-right: 10px;
  width: ${size};
  height: ${size};
`;
