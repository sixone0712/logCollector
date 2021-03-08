import React, { useCallback } from 'react';
import { FileProtectOutlined, PartitionOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';
import { Menu, Row, Col, Dropdown, Space } from 'antd';
import NavBarIcon from '../../atoms/NavBarIcon';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Icon from '../../atoms/Icon';

const { SubMenu } = Menu;

type DashBoardNavBarProps = {
  children?: React.ReactNode;
};

export const NavType = {
  STATUS: 'status',
  STATUS_REMOTE: 'status:remote',
  STATUS_LOCAL: 'status:local',
  CONFIGURE: 'configure',
  RULES: 'rules',
  RULES_LOG_DEF: 'rules:logdef',
  RULES_LOG_CONV: 'rules:logconv',
  ACCOUT: 'acoount',
};

const Container = styled(Row)`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const NavSection = styled(Row)`
  flex-wrap: nowrap;
`;

const Title = styled(Col)`
  align-items: center;
  min-width: 9rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
`;

const LoginUserSection = styled(Row)``;

function DashBoardNavBar({ children }: DashBoardNavBarProps): JSX.Element {
  const history = useHistory();
  const onSelect = useCallback(
    ({ key }: { key: React.Key }) => {
      switch (key) {
        case NavType.STATUS_REMOTE:
          history.push('/status/remote');
          break;
        case NavType.STATUS_LOCAL:
          history.push('/status/local');
          break;
        case NavType.CONFIGURE:
          history.push('/configure');
          break;
        case NavType.RULES_LOG_DEF:
          history.push('/rules/logdef');
          break;
        case NavType.RULES_LOG_CONV:
          history.push('/rules/logconv');
          break;
        case NavType.ACCOUT:
          history.push('/account');
          break;
      }
    },
    [history]
  );

  return (
    <Container>
      <NavSection>
        <Title>Log Collector</Title>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[NavType.STATUS_REMOTE]}
          onSelect={onSelect}
          css={css`
            width: 50rem;
            min-width: 50rem;
          `}
        >
          <SubMenu key={NavType.STATUS} icon={<PartitionOutlined />} title="Status">
            <Menu.Item key={NavType.STATUS_REMOTE}>Remote</Menu.Item>
            <Menu.Item key={NavType.STATUS_LOCAL}>Local</Menu.Item>
          </SubMenu>
          <Menu.Item key={NavType.CONFIGURE} icon={<SettingOutlined />}>
            Configure
          </Menu.Item>
          <SubMenu key={NavType.RULES} icon={<FileProtectOutlined />} title="Rules">
            <Menu.Item key={NavType.RULES_LOG_DEF}>Log Definitions</Menu.Item>
            <Menu.Item key={NavType.RULES_LOG_CONV}>Log Converter</Menu.Item>
          </SubMenu>
          <Menu.Item key={NavType.ACCOUT} icon={<NavBarIcon name="idcard" />}>
            Account
          </Menu.Item>
        </Menu>
      </NavSection>
      <LoginUserSection>
        <Dropdown overlay={LoginUserMenu}>
          <a css={dropdownStyle}>
            <Space css={spaceStyle} align={'center'}>
              <Icon name="user" css={userIconStyle} />
              <span>Administrator</span>
            </Space>
          </a>
        </Dropdown>
      </LoginUserSection>
    </Container>
  );
}

function LoginUserMenu() {
  return (
    <Menu css={loginUserMenuStyle}>
      <Menu.Item>Change Password</Menu.Item>
      <Menu.Item>Logout</Menu.Item>
    </Menu>
  );
}

const dropdownStyle = css`
  color: white;
  /* display: flex;
  align-items: center; */
`;

const userIconStyle = css`
  vertical-align: sub;
`;

const loginUserMenuStyle = css`
  margin-top: -1.25rem;
  text-align: center;
`;

const spaceStyle = css`
  .ant-space-item {
    /* display: flex;
    align-items: center; */
  }
  height: 64px;
`;

export default DashBoardNavBar;
