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
      <Route path={'/status/local'} exact component={Local} />
      <Route path={'/status/remote/new'} exact component={Remote.Job} />
      <Route path={'/status/remote/edit/:id'} exact component={Remote.Job} />
      <Route path={'/status/local/new'} exact component={Local.Job} />
      <Route path={['/status/remote/:type/:id', '/status/local/collect/:id']} component={History} />
    </Switch>
  );
}

const style = css``;
