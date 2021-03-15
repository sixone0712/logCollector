import { css } from '@emotion/react';
import React from 'react';

export type LogDefinitionProps = {
  children?: React.ReactNode;
};

export default function LogDefinition({ children }: LogDefinitionProps) {
  return (
    <div css={style}>
      <div>LogDefinition</div>
    </div>
  );
}

const style = css``;
