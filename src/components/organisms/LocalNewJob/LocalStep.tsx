import React, { useCallback, useState } from 'react';
import { css } from '@emotion/react';
import { Steps } from 'antd';
import { LOCAL_STEP } from './LocalNewJob';

export type LocalStepProps = {
  children?: React.ReactNode;
  current: number;
};

export default function LocalStep({ current }: LocalStepProps): JSX.Element {
  const getDescription = useCallback(
    (step: number) => {
      if (current === step) {
        return 'Processing';
      } else if (current < step) {
        return 'Waiting';
      } else if (current > step) {
        return 'Finished';
      }
    },
    [current]
  );

  return (
    <Steps
      current={current}
      direction="vertical"
      css={css`
        width: 16.875rem;
        height: 28.125rem;
        flex-wrap: nowrap;
        border-right: 1px solid #d9d9d9;
        padding-top: 4.125rem;
      `}
    >
      <Steps.Step title="Configure" description={getDescription(LOCAL_STEP.CONFIGURE)} />
      <Steps.Step title="Confirm" description={getDescription(LOCAL_STEP.CONFIRM)} />
    </Steps>
  );
}

const style = css``;