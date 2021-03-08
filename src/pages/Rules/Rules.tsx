import React from 'react';
import { css } from '@emotion/react';
import { Route, Switch } from 'react-router-dom';
import LogDefinition from './LogDefinition';
import LogConverter from './LogConverter';

export type RulesProps = {
  children?: React.ReactNode;
};

export default function Rules({ children }: RulesProps) {
  return (
    <Switch>
      <Route path={'/rules/logdef'}>
        <LogDefinition />
      </Route>
      <Route path={'/rules/logconv'}>
        <LogConverter />
      </Route>
    </Switch>
  );
}

const style = css``;
