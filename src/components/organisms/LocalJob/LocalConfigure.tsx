import { DesktopOutlined, FileAddOutlined, InboxOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Row, Select, Space, Upload } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getConfigureSitesFabsNames } from '../../../lib/util/requestAxios';
import { ResSitesNames } from '../../../types/Configure';

export type LocalConfigureProps = {
  children?: React.ReactNode;
  selectSite: LabeledValue | undefined;
  setSelectSite: ({ value, label }: LabeledValue) => void;
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
  const { isLoading, isError, data, error, status, isFetching } = useQuery<ResSitesNames[]>(
    'get_configure_sites_fabs_name',
    getConfigureSitesFabsNames,
    {
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
      // refetchOnMount: true,
      // initialData: [],
    }
  );
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

  return (
    <>
      <SelectSiteName align="top">
        <Space css={spaceStyle}>
          <DesktopOutlined />
          <span>Select Site</span>
        </Space>
        <Select
          showSearch
          labelInValue
          css={selectStyle}
          value={selectSite}
          placeholder="Select a site"
          onSelect={setSelectSite}
          loading={isFetching}
          optionFilterProp="children"
          filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {data?.map((item) => (
            <Select.Option key={item.id} value={item.id} label={item.site_fab_name}>
              {item.site_fab_name}
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
