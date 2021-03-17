import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Col, Row, Select, Space } from 'antd';
import { DesktopOutlined, FileAddOutlined, InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import styled from '@emotion/styled';
import useAddLocalJob from '../../../hooks/useAddLocalJob';
import { useQuery } from 'react-query';
import axios from 'axios';
import { SiteDB } from '../../../types/ConfigDB';

export type LocalConfigureProps = {
  children?: React.ReactNode;
  selectSite: string;
  setSelectSite: React.Dispatch<string>;
  uploadFiles: any;
  setUploadFiles: React.Dispatch<any>;
};

const SelectSiteName = styled(Row)`
  font-size: 1rem;
  flex-wrap: nowrap;
  /* height: 14.0625rem; */
`;
const FileUpload = styled(Row)`
  font-size: 1rem;
  margin-top: 6.25rem;
  flex-wrap: nowrap;
  /* height: 14.0625rem; */
`;

const requestSiteList = async () => {
  try {
    const { data } = await axios.get<SiteDB[]>('/api/sitelist');
    return data;
  } catch (e) {
    return e;
  }
};

export default function LocalConfigure({
  selectSite,
  setSelectSite,
  uploadFiles,
  setUploadFiles,
}: LocalConfigureProps): JSX.Element {
  const { data } = useQuery<SiteDB[]>('sitelist', requestSiteList);

  const props = {
    name: 'file',
    multiple: true,
    beforeUpload: (file: any) => {
      console.log('file', file);
      setUploadFiles((prevState: any) => [...prevState, file]);
      return false;
    },
    uploadFiles,
  };
  return (
    <>
      <SelectSiteName align="top">
        <Space css={spaceStyle}>
          <DesktopOutlined />
          <span>Select Site</span>
        </Space>
        <Select css={selectStyle} value={selectSite} placeholder="Select a site" onChange={setSelectSite}>
          {data?.map((item) => (
            <Select.Option key={item.id} value={item.site_name}>
              {item.site_name}
            </Select.Option>
          ))}
        </Select>
      </SelectSiteName>
      <FileUpload align="top">
        <Space css={spaceStyle}>
          <FileAddOutlined />
          <span>Load File</span>
        </Space>

        <Upload.Dragger {...props}>
          <div css={uploadContextsStyle}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </div>
        </Upload.Dragger>
      </FileUpload>
    </>
  );
}

const spaceStyle = css`
  min-width: 13.25rem;
  /* font-size: 1.25rem; */
`;

const selectStyle = css`
  min-width: 33.75rem;
  text-align: center;
  font-size: inherit;
`;

const uploadContextsStyle = css`
  min-width: 33.75rem;
`;
