import { css } from '@emotion/react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashBoardBreadcrumb from '../../components/modules/DashBoardBreadcrumb';
import DashBoardFooter from '../../components/modules/DashBoardFooter';
import DashBoardNavBar from '../../components/modules/DashBoardHeader';
import AppLayout from '../../components/Templates/AppLayout';
import Account from '../Account';
import Configure from '../Configure';
import Rules from '../Rules';
import Status from '../Status';

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
        <AppLayout.Main.BreadCrumb>
          <DashBoardBreadcrumb />
        </AppLayout.Main.BreadCrumb>
        <AppLayout.Main.Contents>
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
        </AppLayout.Main.Contents>
      </AppLayout.Main>
      <AppLayout.Footer>
        <DashBoardFooter />
      </AppLayout.Footer>
    </>
  );
}

const style = css``;
