import React from 'react';
import { css } from '@emotion/react';

export type LogConverterProps = {
  children?: React.ReactNode;
};

export default function LogConverter({ children }: LogConverterProps) {
  return <div css={style}>LogConverter</div>;
}

const style = css``;
