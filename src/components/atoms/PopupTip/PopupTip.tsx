import { css } from '@emotion/react';
import { Col, Row, Tooltip } from 'antd';
import React from 'react';

interface PopupTipProps {
  value: number | string;
  list: string[];
}
export default function PopupTip({ value, list }: PopupTipProps): JSX.Element {
  const title = (
    <Row
      css={css`
        flex-direction: column;
      `}
    >
      {list?.map((item, idx) => {
        return <Col key={idx}>{item}</Col>;
      })}
    </Row>
  );

  return (
    <Tooltip title={title} color="cyan">
      <span>{value}</span>
    </Tooltip>
  );
}
