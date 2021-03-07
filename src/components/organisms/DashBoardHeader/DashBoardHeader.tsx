import React from 'react';
import { Menu } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  SolutionOutlined,
  PartitionOutlined,
} from '@ant-design/icons';
import Icon from '../../atoms/Icon';
import { css } from '@emotion/react';

const { SubMenu } = Menu;

type DashBoardHeaderProps = {
  children?: React.ReactNode;
};

function DashBoardHeader({ children }: DashBoardHeaderProps) {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['status']}>
      <SubMenu key="status" icon={<PartitionOutlined />} title="Status">
        <Menu.Item key="status:remote">Remote</Menu.Item>
        <Menu.Item key="status:local">Local</Menu.Item>
      </SubMenu>
      <Menu.Item key="configure" icon={<SettingOutlined />}>
        Configure
      </Menu.Item>
      <SubMenu
        key="rules"
        icon={
          <Icon
            name="play"
            css={css`
              width: 1em;
              margin-right: 10px;
            `}
          />
        }
        title="Rules"
      >
        <Menu.Item key="rules:logdef">Log Definitions</Menu.Item>
        <Menu.Item key="rules:converter">Log Converter</Menu.Item>
      </SubMenu>

      <Menu.Item key="acoount" icon={<SolutionOutlined />}>
        Account
      </Menu.Item>
    </Menu>
  );
}

export default DashBoardHeader;
