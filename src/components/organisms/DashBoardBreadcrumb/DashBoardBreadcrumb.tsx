import React from 'react';
import { css } from '@emotion/react';
import { Breadcrumb } from 'antd';
import { HomeOutlined, SettingOutlined, PartitionOutlined, FileProtectOutlined } from '@ant-design/icons';
import qs from 'qs';
import { useLocation, useParams } from 'react-router';
import CustomIcon from '../../atoms/CustomIcon';

export type DashBoardBreadcrumbProps = {
  children?: React.ReactNode;
};

interface DashParams {
  type?: string;
  id?: string;
}

interface DashLocation {
  search: string;
  pathname: string;
}

export default function DashBoardBreadcrumb({ children }: DashBoardBreadcrumbProps): JSX.Element {
  const location = useLocation<DashLocation>();
  const { icon, locations } = getBreadcrumb(location);

  console.log('location', location);

  return (
    <Breadcrumb css={breadcrumbStyle} separator=">">
      <Breadcrumb.Item>
        <HomeOutlined />
      </Breadcrumb.Item>
      {locations.map(
        (item: string, idx: number) =>
          item && (
            <Breadcrumb.Item key={item}>
              {idx === 0 && icon}
              <span>{item}</span>
            </Breadcrumb.Item>
          )
      )}
    </Breadcrumb>
  );
}

const breadcrumbStyle = css`
  padding-top: 1rem;
  padding-bottom: 1rem;
  /* width: 84rem;  */
  /* background-color: #eff2f5; */
`;

const getLocationName = (path: string) => {
  switch (path) {
    case 'status':
      return 'Status';
    case 'remote':
      return 'Remote';
    case 'local':
      return 'Local';
    case 'new':
      return 'New Job';
    case 'edit':
      return 'Edit Job';
    case 'history':
      return 'Build History';
    case 'collect':
      return 'Collect/Convert/Insert';
    case 'error':
      return 'Send Error Summary';
    case 'cras':
      return 'Create Cras Data';
    case 'version':
      return 'Version Check';
    case 'configure':
      return 'Configure';
    case 'rules':
      return 'Rules';
    case 'account':
      return 'Account';
    case 'logdef':
      return 'Log Definition';
    case 'logconv':
      return 'Log Converter';
    default:
      return '';
  }
};

const getBreadcrumb = (location: DashLocation) => {
  const { pathname } = location;

  if (pathname.startsWith('/status')) {
    return {
      icon: <PartitionOutlined />,
      locations: getStatusLocation(location),
    };
  } else if (pathname.startsWith('/configure')) {
    return {
      icon: <SettingOutlined />,
      locations: getConfigureLocation(location),
    };
  } else if (pathname.startsWith('/rules')) {
    return {
      icon: <FileProtectOutlined />,
      locations: getRulesLocation(location),
    };
  } else if (pathname.startsWith('/account')) {
    return {
      icon: <CustomIcon name="idcard" />,
      locations: getAccountLocation(location),
    };
  }

  return {
    icon: null,
    locations: [],
  };
};

const getStatusLocation = (location: DashLocation) => {
  const { pathname, search } = location;
  const path = pathname.substring(1).split('/');
  const { name } = qs.parse(search, {
    ignoreQueryPrefix: true, // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
  });

  if (name) {
    return path.map((item, idx) => {
      if (idx === path.length - 1) return '';
      else return getLocationName(item);
    });
  } else {
    return path.map((item) => getLocationName(item));
  }
};

const getConfigureLocation = (location: DashLocation) => {
  const { pathname } = location;
  const path = pathname.substring(1).split('/');
  return path.map((item) => getLocationName(item));
};

const getRulesLocation = (location: DashLocation) => {
  const { pathname } = location;
  const path = pathname.substring(1).split('/');
  return path.map((item) => getLocationName(item));
};

const getAccountLocation = (location: DashLocation) => {
  const { pathname } = location;
  const path = pathname.substring(1).split('/');
  return path.map((item) => getLocationName(item));
};
