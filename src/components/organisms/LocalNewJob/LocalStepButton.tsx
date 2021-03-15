import React, { useCallback } from 'react';
import { css } from '@emotion/react';
import { Button, Row } from 'antd';
import styled from '@emotion/styled';
import LocalStep from './LocalStep';
import { LOCAL_STEP } from './LocalNewJob';

export type LocalStepButtonProps = {
  children?: React.ReactNode;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 47.125rem;
  margin-left: 29.625rem;
`;

export default function LocalStepButton({ current, setCurrent }: LocalStepButtonProps): JSX.Element {
  const onNext = useCallback(() => {
    setCurrent((prevState) => prevState + 1);
  }, [current, setCurrent]);

  const onPrev = useCallback(() => {
    setCurrent((prevState) => prevState - 1);
  }, [current, setCurrent]);

  return (
    <Container>
      {current === LOCAL_STEP.CONFIGURE && (
        <>
          <div></div>
          <Button type="primary" css={btnStyle} onClick={onNext}>
            Next
          </Button>
        </>
      )}
      {current > LOCAL_STEP.CONFIGURE && (
        <>
          <Button type="primary" css={btnStyle} onClick={onPrev}>
            Prev
          </Button>
          <Button type="primary" css={btnStyle} onClick={onNext}>
            Add
          </Button>
        </>
      )}
    </Container>
  );
}

const btnStyle = css`
  border-radius: 0.625rem;
`;
