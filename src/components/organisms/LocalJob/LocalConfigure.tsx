import { DesktopOutlined, FileAddOutlined, InboxOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Row, Select, Space, Upload } from 'antd';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { requestSiteList } from '../../../lib/util/requestAxios';
import { SiteDB } from '../../../types/ConfigDB';

export type LocalConfigureProps = {
  children?: React.ReactNode;
  selectSite: string | undefined;
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

export default function LocalConfigure({
  selectSite,
  setSelectSite,
  uploadFiles,
  setUploadFiles,
}: LocalConfigureProps): JSX.Element {
  const { isLoading, isError, data, error, status, isFetching } = useQuery<SiteDB[]>('site/getList', requestSiteList, {
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
    // refetchOnMount: true,
    // initialData: [],
  });
  console.log('data', data);
  console.log('isLoading', isLoading);
  console.log('isError', isError);
  console.log('error', error);
  console.log('status', status);
  console.log('isFetching', isFetching);

  const props = {
    name: 'file',
    multiple: true,
    beforeUpload: (file: any) => {
      console.log('file', file);
      setUploadFiles((prevState: any) => [...prevState, file]);
      return false;
    },
    uploadFiles,
    defaultFileList: uploadFiles,
  };

  useEffect(() => {
    console.log('useEffect');
    return () => {
      console.log('useEffect clean');
    };
  }, []);

  return (
    <>
      <SelectSiteName align="top">
        <Space css={spaceStyle}>
          <DesktopOutlined />
          <span>Select Site</span>
        </Space>
        <Select
          showSearch
          css={selectStyle(selectSite)}
          value={selectSite}
          placeholder="Select a site"
          onSelect={setSelectSite}
          loading={isFetching}
          optionFilterProp="children"
          filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
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

const selectStyle = (onSelect: string | undefined) => css`
  min-width: 33.75rem;
  text-align: center;
  font-size: inherit;
  /* .ant-select-selection-item {
    color: ${onSelect === 'Select a site' && '#bfbfbf'};
  } */
`;

const uploadContextsStyle = css`
  min-width: 33.75rem;
`;
