import React from 'react';
import { css } from '@emotion/react';

export type UserLoginProps = {
  children?: React.ReactNode;
};

export default function UserLogin({ children }: UserLoginProps): JSX.Element {
  return <div css={style}>Login</div>;
}

const style = css``;
