import React from 'react';
import { css } from '@emotion/react';
import { useLocation, useParams } from 'react-router-dom';

export type BuildHistoryProps = {
  children?: React.ReactNode;
  type: string;
};

export default function BuildHistory({ children, type }: BuildHistoryProps) {
  const params = useParams();
  const location = useLocation();
  console.log('BuildHistorylocation', location);
  console.log('BuildHistoryparams', params);
  return (
    <div css={style}>
      <div>BuildHistory</div>
      <div>{type}</div>
    </div>
  );
}

const style = css``;
