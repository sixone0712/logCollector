import { css } from '@emotion/react';
import React from 'react';

export type ConfigureProps = {
  children?: React.ReactNode;
};

export default function Configure({ children }: ConfigureProps) {
  return (
    <div css={style}>
      <div>Configure</div>
    </div>
  );
}

const style = css``;
