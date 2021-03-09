import { FileProtectOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CustomIcon from '../../components/atoms/CustomIcon';
import DashBoardBreadcrumb from '../../components/organisms/DashBoardBreadcrumb';
import LogConverter from './LogConverter';
import LogDefinition from './LogDefinition';

export type RulesProps = {
  children?: React.ReactNode;
};

export default function Rules({ children }: RulesProps) {
  return (
    <Switch>
      <Route path={'/rules/logdef'}>
        <DashBoardBreadcrumb locations={['Rules', 'Log Definition']} icon={<FileProtectOutlined />} />
        <LogDefinition />
      </Route>
      <Route path={'/rules/logconv'}>
        <DashBoardBreadcrumb locations={['Rules', 'Log Converter']} icon={<CustomIcon name="idcard" />} />
        <LogConverter />
      </Route>
    </Switch>
  );
}

const style = css``;
