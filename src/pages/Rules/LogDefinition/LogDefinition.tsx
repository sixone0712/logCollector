import React from 'react';
import { css } from '@emotion/react';

export type LogDefinitionProps = {
  children?: React.ReactNode;
};

export default function LogDefinition({ children }: LogDefinitionProps) {
  return <div css={style}>LogDefinition</div>;
}

const style = css``;
