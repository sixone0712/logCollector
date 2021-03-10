import React from 'react';
import { css } from '@emotion/react';
import AppLayout from '../../components/Templates/AppLayout';
import { Route, Switch } from 'react-router-dom';
import Status from '../Status';
import Configure from '../Configure';
import Rules from '../Rules';
import Account from '../Account';
import DashBoardNavBar from '../../components/organisms/DashBoardHeader';
import DashBoardFooter from '../../components/organisms/DashBoardFooter';

export type DashBoardProps = {
  children?: React.ReactNode;
};

export default function DashBoard({ children }: DashBoardProps) {
  return (
    <>
      <AppLayout.Hedaer>
        <DashBoardNavBar />
      </AppLayout.Hedaer>
      <AppLayout.Main>
        <Switch>
          <Route path={'/status'}>
            <Status />
          </Route>
          <Route path={'/configure'}>
            <Configure />
          </Route>
          <Route path={'/rules'}>
            <Rules />
          </Route>
          <Route path={'/account'}>
            <Account />
          </Route>
        </Switch>
      </AppLayout.Main>
      <AppLayout.Footer>
        <DashBoardFooter />
      </AppLayout.Footer>
    </>
  );
}

const style = css``;
