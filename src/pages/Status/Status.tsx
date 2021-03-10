import { css } from '@emotion/react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Local from './Local';
import Remote from './Remote';
import History from './History';

export type StatusProps = {
  children?: React.ReactNode;
};

export default function Status({ children }: StatusProps) {
  return (
    <Switch>
      <Route path={'/status/remote'} exact component={Remote} />
      <Route path={'/status/remote/:type/:id'} component={History} />
      <Route path={'/status/local'} component={Local} />
    </Switch>
  );
}

const style = css``;
