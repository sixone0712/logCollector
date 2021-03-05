import React from "react";
import { css } from "@emotion/react";

export type ConfigureProps = {
  children?: React.ReactNode;
};

export default function Configure({ children }: ConfigureProps) {
  return <div css={style}>Configure</div>;
}

const style = css``;
