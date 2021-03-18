import React from 'react';
import { css, Global } from '@emotion/react';
import './App.css';
import globalStyle from './globalStyle';
import AppLayout from './components/Templates/AppLayout';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashBoard from './pages/DashBoard';
import { hot } from 'react-hot-loader/root';
import Test from './Test';

function App() {
  return (
    <>
      <AppLayout>
        <Switch>
          <Route path={'/login'}>
            <Login />
          </Route>
          <Route path={['/status', '/configure', '/rules', '/account']}>
            <DashBoard />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
        </Switch>
      </AppLayout>
      <Global styles={globalStyle} />
    </>
  );
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
