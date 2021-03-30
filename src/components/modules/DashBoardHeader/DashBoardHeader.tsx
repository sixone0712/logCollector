import React, { useCallback } from 'react';
import { FileProtectOutlined, PartitionOutlined, SettingOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Col, Dropdown, Menu, Row, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import CustomIcon from '../../atoms/CustomIcon';
import { blue } from '@ant-design/colors';

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
  min-width: 14rem;
  font-size: 1.714rem;
  font-weight: 700;
  color: white;
`;

const LoginUserSection = styled(Row)``;

function DashBoardNavBar({ children }: DashBoardNavBarProps): JSX.Element {
  const history = useHistory();
  const onClickNavItem = useCallback(
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
        <Title>Log Monitor</Title>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[NavType.STATUS_REMOTE]} css={menuStyle}>
          <SubMenu key={NavType.STATUS} icon={<PartitionOutlined />} title="Status">
            <Menu.Item key={NavType.STATUS_REMOTE} onClick={onClickNavItem}>
              Remote
            </Menu.Item>
            <Menu.Item key={NavType.STATUS_LOCAL} onClick={onClickNavItem}>
              Local
            </Menu.Item>
          </SubMenu>
          <Menu.Item key={NavType.CONFIGURE} icon={<SettingOutlined />} onClick={onClickNavItem}>
            Configure
          </Menu.Item>
          <SubMenu key={NavType.RULES} icon={<FileProtectOutlined />} title="Rules">
            <Menu.Item key={NavType.RULES_LOG_DEF} onClick={onClickNavItem}>
              Log Definitions
            </Menu.Item>
            <Menu.Item key={NavType.RULES_LOG_CONV} onClick={onClickNavItem}>
              Log Converter
            </Menu.Item>
          </SubMenu>
          <Menu.Item key={NavType.ACCOUT} icon={<CustomIcon name="idcard" />} onClick={onClickNavItem}>
            Account
          </Menu.Item>
        </Menu>
      </NavSection>
      <LoginUserSection>
        <Dropdown overlay={LoginUserMenu} trigger={['click']}>
          <a css={dropdownStyle}>
            <Space css={spaceStyle}>
              <CustomIcon name="user" css={userIconStyle} />
              <div>Administrator</div>
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

const menuStyle = css`
  width: 50rem;
  min-width: 50rem;
`;

const dropdownStyle = css`
  color: white;
  &:hover {
    color: ${blue[2]};
  }
`;

const userIconStyle = css`
  font-size: 2rem;
`;

const loginUserMenuStyle = css`
  margin-top: -1rem;
  text-align: center;
`;

const spaceStyle = css`
  display: flex; // Space에 flex를 설정하지 않으면 Navar의 높이가 튀어나온다...
  .ant-space-item {
    display: flex; //Space의 align 속성이 적용되지 않기 대문에 내부 item에 flex 적용
  }
`;

export default DashBoardNavBar;
