import { DesktopOutlined, FileAddOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Col, Row, Space } from 'antd';
import React from 'react';
import useLocalJob from '../../../hooks/useLocalJob';

export type LocalConfirmProps = {};
export default function LocalConfirm(): JSX.Element {
  const { selectSite, uploadFiles } = useLocalJob();

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

const spaceStyle = css`
  min-width: 13.25rem;
`;
