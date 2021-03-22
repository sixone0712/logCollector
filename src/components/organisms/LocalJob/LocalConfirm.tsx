import React from 'react';
import { css } from '@emotion/react';
import { Col, Row, Select, Space } from 'antd';
import { DesktopOutlined, FileAddOutlined, InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import styled from '@emotion/styled';
import { LabeledValue } from 'antd/lib/select';

export type LocalConfirmProps = {
  selectSite: LabeledValue | undefined;
  uploadFiles: any;
};

const SiteName = styled(Row)`
  font-size: 1rem;
  flex-wrap: nowrap;
`;
const FileUpload = styled(Row)`
  font-size: 1rem;
  margin-top: 2rem;
  flex-wrap: nowrap;
`;

const SelectedSite = styled(Col)``;
const UploadFiles = styled(Col)``;
const UploadFileCount = styled(Row)``;
const UploadFileList = styled(Row)`
  margin-left: 0.5rem;
`;

export default function LocalConfirm({ selectSite, uploadFiles }: LocalConfirmProps): JSX.Element {
  return (
    <>
      <SiteName align="middle">
        <Space css={spaceStyle}>
          <DesktopOutlined />
          <span>Select Site</span>
        </Space>
        <SelectedSite>{selectSite?.label}</SelectedSite>
      </SiteName>
      <FileUpload align="top">
        <Space css={spaceStyle}>
          <FileAddOutlined />
          <span>Load File</span>
        </Space>
        <UploadFiles>
          <UploadFileCount>{uploadFiles.length} Files</UploadFileCount>
          {uploadFiles.map((item: any) => (
            <UploadFileList key={item.uid}>
              <Space>
                <span>•</span>
                {item.name as string}
              </Space>
            </UploadFileList>
          ))}
        </UploadFiles>
      </FileUpload>
    </>
  );
}

const spaceStyle = css`
  min-width: 13.25rem;
`;
