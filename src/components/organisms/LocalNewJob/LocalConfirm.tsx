import React from 'react';
import { css } from '@emotion/react';
import { Col, Row, Select, Space } from 'antd';
import { DesktopOutlined, FileAddOutlined, InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import styled from '@emotion/styled';

export type LocalConfirmProps = {
  children?: React.ReactNode;
};

const SelectSiteName = styled(Row)`
  font-size: 1rem;
  flex-wrap: nowrap;
`;
const FileUpload = styled(Row)`
  font-size: 1rem;
  margin-top: 2rem;
  flex-wrap: nowrap;
`;

const SelectedItem = styled(Col)``;

export default function LocalConfirm({ children }: LocalConfirmProps): JSX.Element {
  return (
    <>
      <SelectSiteName align="middle">
        <Space css={spaceStyle}>
          <DesktopOutlined />
          <span>Select Site</span>
        </Space>
        <SelectedItem>GKC_BQ</SelectedItem>
      </SelectSiteName>
      <FileUpload align="middle">
        <Space css={spaceStyle}>
          <FileAddOutlined />
          <span>Load File</span>
        </Space>
        <SelectedItem>3 Files</SelectedItem>
      </FileUpload>
    </>
  );
}

const spaceStyle = css`
  min-width: 13.25rem;
`;
