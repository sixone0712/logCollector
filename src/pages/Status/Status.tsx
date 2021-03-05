import React from "react";
import { css } from "@emotion/react";
import { Route, Switch } from "react-router-dom";
import Remote from "./Remote";
import Local from "./Local";

export type StatusProps = {
  children?: React.ReactNode;
};

export default function Status({ children }: StatusProps) {
  return (
    <Switch>
      <Route path={"/status/remote"}>
        <Remote />
      </Route>
      <Route path={"/status/local"}>
        <Local />
      </Route>
    </Switch>
  );
}

const style = css``;
