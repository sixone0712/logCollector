import { css } from '@emotion/react';
import React from 'react';

export type AccountProps = {
  children?: React.ReactNode;
};

export default function Account({ children }: AccountProps) {
  return (
    <div css={style}>
      <div>Account</div>
    </div>
  );
}

const style = css``;
