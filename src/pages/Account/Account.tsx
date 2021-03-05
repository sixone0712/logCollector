import React from "react";
import { css } from "@emotion/react";

export type AccountProps = {
  children?: React.ReactNode;
};

export default function Account({ children }: AccountProps) {
  return <div css={style}>Account</div>;
}

const style = css``;
