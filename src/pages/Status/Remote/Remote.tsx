import React from "react";
import { css } from "@emotion/react";

export type RemoteProps = {
  children?: React.ReactNode;
};

export default function Remote({ children }: RemoteProps) {
  return <div css={style}>Remote</div>;
}

const style = css``;
