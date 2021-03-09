import React from 'react';
import { css } from '@emotion/react';
import { Breadcrumb } from 'antd';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';

export type DashBoardBreadcrumbProps = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  locations: string[];
};

export default function DashBoardBreadcrumb({ children, locations, icon }: DashBoardBreadcrumbProps) {
  return (
    <Breadcrumb css={breadcrumbStyle} separator=">">
      <Breadcrumb.Item>
        <HomeOutlined />
      </Breadcrumb.Item>
      {locations.map((item: string, idx: number) => (
        <Breadcrumb.Item key="item">
          {idx === 0 && icon}
          <span>{item}</span>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

const breadcrumbStyle = css`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
