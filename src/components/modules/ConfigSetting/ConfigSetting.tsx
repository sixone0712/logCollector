import React from 'react';
import { css } from '@emotion/react';
import DBSetting from './DBSetting';

export type ConfigureProps = {
  children?: React.ReactNode;
};

export default function ConfigSetting({ children }: ConfigureProps): JSX.Element {
  return (
    <div css={style}>
      <DBSetting />
    </div>
  );
}

const style = css``;
