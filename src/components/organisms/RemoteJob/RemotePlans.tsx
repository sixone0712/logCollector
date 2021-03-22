import { DesktopOutlined, ProfileOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Row, Select, Space } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { getConfigureSitesFabsNames } from '../../../lib/util/requestAxios';
import { SiteDB } from '../../../types/ConfigDB';
import { ResSitesNames } from '../../../types/Configure';
import RemotePlansTable from './RemotePlansTable';

export type RemotePlansProps = {
  children?: React.ReactNode;
  selectSite: string | undefined;
  setSelectSite: React.Dispatch<string>;
};

const SelectSiteName = styled(Row)`
  font-size: 1rem;
  flex-wrap: nowrap;
  /* height: 14.0625rem; */
`;
const SelectPlans = styled(Row)`
  font-size: 1rem;
  margin-top: 2rem;
  flex-wrap: nowrap;
  /* height: 14.0625rem; */
  flex-direction: column;
`;

export default function RemotePlans({ selectSite, setSelectSite }: RemotePlansProps): JSX.Element {
  const { isLoading, isError, data, error, status, isFetching } = useQuery<ResSitesNames[]>(
    'sites_fabs_name',
    getConfigureSitesFabsNames,
    {
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
      // refetchOnMount: true,
      // initialData: [],
    }
  );

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
            <Select.Option key={item.id} value={item.site_fab_name}>
              {item.site_fab_name}
            </Select.Option>
          ))}
        </Select>
      </SelectSiteName>
      <SelectPlans>
        <Space css={spaceStyle}>
          <ProfileOutlined />
          <span>Plans</span>
        </Space>
        <RemotePlansTable />
      </SelectPlans>
    </>
  );
}

const spaceStyle = css`
  min-width: 13.25rem;
  /* font-size: 1.25rem; */
  margin-bottom: 0.5rem;
`;

const selectStyle = (onSelect: string | undefined) => css`
  min-width: 33.75rem;
  text-align: center;
  font-size: inherit;
`;
