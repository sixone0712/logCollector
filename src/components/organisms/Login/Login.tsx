import React from 'react';
import { css} from "@emotion/react";

export type LoginProps = {
  children?: React.ReactNode
};

export default function Login({ children }: LoginProps): JSX.Element {
  return <div css={style}>Login</div>;
};

const style = css``;