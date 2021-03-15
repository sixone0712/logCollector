import React from 'react';
import { css } from '@emotion/react';
import { Col, Row, Select, Space } from 'antd';
import { DesktopOutlined, FileAddOutlined, InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import styled from '@emotion/styled';

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
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      <SelectSiteName align="middle">
        <Space
          css={css`
            min-width: 13.25rem;
          `}
        >
          <DesktopOutlined />
          <span>Select Site</span>
        </Space>
        <Select
          defaultValue="lucy"
          css={css`
            min-width: 33.75rem;
            text-align: center;
          `}
        >
          <Select.Option value="jack">Jack</Select.Option>
          <Select.Option value="lucy">Lucy</Select.Option>
        </Select>
      </SelectSiteName>
      <FileUpload align="middle">
        <Space
          css={css`
            min-width: 13.25rem;
          `}
        >
          <FileAddOutlined />
          <span>Load File</span>
        </Space>

        <Upload.Dragger {...props}>
          <div
            css={css`
              min-width: 33.75rem;
            `}
          >
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

const style = css``;
