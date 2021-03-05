import React from "react";
import { css } from "@emotion/react";

export type RulesProps = {
  children?: React.ReactNode;
};

export default function Rules({ children }: RulesProps) {
  return <div css={style}>Rules</div>;
}

const style = css``;
