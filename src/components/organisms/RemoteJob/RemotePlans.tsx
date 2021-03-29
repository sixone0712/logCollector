import { DesktopOutlined, ProfileOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Row, Select, Space } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import useRemoteJob from '../../../hooks/useRemoteJob';
import { getConfigureSitesFabsNames } from '../../../lib/api/axios/requests';
import { SiteFabName } from '../../../types/Configure';
import RemotePlansTable from './RemotePlansTable';

export type RemotePlansProps = {};
export default function RemotePlans(): JSX.Element {
  const { selectSite, setSelectSite } = useRemoteJob();

  const { isLoading, isError, data, error, status, isFetching } = useQuery<SiteFabName[]>(
    'get_site_fab_names',
    getConfigureSitesFabsNames,
    {
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
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
            <Select.Option key={item.id} value={item.id} label={item.siteFabName}>
              {item.siteFabName}
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

const spaceStyle = css`
  min-width: 13.25rem;
  /* font-size: 1.25rem; */
  margin-bottom: 0.5rem;
`;

const selectStyle = css`
  min-width: 33.75rem;
  text-align: center;
  font-size: inherit;
`;
