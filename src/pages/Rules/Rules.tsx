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
      <Route path={'/rules/logdef'} component={LogDefinition} />
      <Route path={'/rules/logconv'} component={LogConverter} />
    </Switch>
  );
}

const style = css``;
