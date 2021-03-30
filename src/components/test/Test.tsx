import React from 'react';
import { css } from '@emotion/react';

export type TestProps = {
  children?: React.ReactNode;
};

export default function Test({ children }: TestProps): JSX.Element {
  return <div css={style}>Test</div>;
}

const style = css``;
