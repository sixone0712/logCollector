import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Col, Row, Select, Space } from 'antd';
import { DesktopOutlined, FileAddOutlined, InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import styled from '@emotion/styled';
import useAddLocalJob from '../../../hooks/useAddLocalJob';

export type LocalConfigureProps = {
  children?: React.ReactNode;
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

export default function LocalConfigure({ children }: LocalConfigureProps): JSX.Element {
  const [fileList, setFileList] = useState<any>([]);

  const { getSiteList } = useAddLocalJob();
  const props = {
    name: 'file',
    multiple: true,
    beforeUpload: (file: any) => {
      console.log('file', file);
      setFileList((prevState: any) => [...prevState, file]);
      return false;
    },
    fileList,
  };
  return (
    <>
      <SelectSiteName align="top">
        <Space css={spaceStyle}>
          <DesktopOutlined />
          <span>Select Site</span>
        </Space>
        <Select css={selectStyle} placeholder="Select a site">
          {getSiteList.map((item) => (
            <Select.Option key={item.no} value={item.siteName}>
              {item.siteName}
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
