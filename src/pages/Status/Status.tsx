import { PartitionOutlined, SettingOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashBoardBreadcrumb from '../../components/organisms/DashBoardBreadcrumb';
import Local from './Local';
import Remote from './Remote';

export type StatusProps = {
  children?: React.ReactNode;
};

export default function Status({ children }: StatusProps) {
  return (
    <Switch>
      <Route path={'/status/remote'}>
        <DashBoardBreadcrumb locations={['Status', 'Remote']} icon={<PartitionOutlined />} />
        <Remote />
      </Route>
      <Route path={'/status/local'}>
        <DashBoardBreadcrumb locations={['Status', 'Local']} icon={<SettingOutlined />} />
        <Local />
      </Route>
    </Switch>
  );
}

const style = css``;
