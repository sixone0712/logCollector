import React from 'react';
import { css } from '@emotion/react';
import HostDBSetting from './HostDBSetting';

export type ConfigureProps = {
  children?: React.ReactNode;
};

export default function ConfigSetting({ children }: ConfigureProps): JSX.Element {
  return (
    <div css={style}>
      <HostDBSetting />
    </div>
  );
}

const style = css``;
