import React from 'react';
import { css } from '@emotion/react';

export type LocalConfirmProps = {
  children?: React.ReactNode;
};

export default function LocalConfirm({ children }: LocalConfirmProps): JSX.Element {
  return <div css={style}>LocalConfirm</div>;
}

const style = css``;
