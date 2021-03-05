import React from "react";
import { css } from "@emotion/react";

export type LocalProps = {
  children?: React.ReactNode;
};

export default function Local({ children }: LocalProps) {
  return <div css={style}>Local</div>;
}

const style = css``;
