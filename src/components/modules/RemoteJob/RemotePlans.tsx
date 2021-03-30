import { DesktopOutlined, ProfileOutlined, ReloadOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Row, Select, Space } from 'antd';
import React from 'react';
import useRemoteJob from '../../../hooks/useRemoteJob';
import { useSiteFabName } from '../../../hooks/useSiteFabName';
import { RemoteJobType } from '../../../pages/Status/Remote/Remote';
import RemotePlansTable from './RemotePlansTable';

export type RemotePlansProps = {
  type: RemoteJobType;
};
export default function RemotePlans({ type }: RemotePlansProps): JSX.Element {
  const { selectSite, setSelectSite } = useRemoteJob();
  const { data, disabledSelectSite, refreshSiteFabName, isFetching } = useSiteFabName(type);

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
          disabled={disabledSelectSite}
        >
          {data?.map((item) => (
            <Select.Option key={item.id} value={item.id} label={item.siteFabName}>
              {item.siteFabName}
            </Select.Option>
          ))}
        </Select>
        {type === 'new' && (
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            css={btnStyle}
            onClick={refreshSiteFabName}
            loading={isFetching}
            disabled={isFetching}
          />
        )}
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

const btnStyle = css`
  border-radius: 0.625rem;
  margin-left: 0.5rem;
`;
