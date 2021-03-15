import { css } from '@emotion/react';
import React from 'react';

export type LogConverterProps = {
  children?: React.ReactNode;
};

export default function LogConverter({ children }: LogConverterProps) {
  return (
    <div css={style}>
      <div>LogConverter</div>
    </div>
  );
}

const style = css``;
