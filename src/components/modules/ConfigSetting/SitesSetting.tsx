import { CloudServerOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Row } from 'antd';
import React from 'react';
import { useSiteDBInfo } from '../../../hooks/useSiteDBInfo';
import ConfigTitle from './ConfigTitle';
import SiteSettingAddEdit from './SiteSettingAddEdit';
import SitesTable from './SitesTable';

export type SitesSettingProps = {
  children?: React.ReactNode;
};

export default function SitesSetting({ children }: SitesSettingProps): JSX.Element {
  const {
    data,
    isFetching,
    refreshSiteDBinfo,
    isError,
    visibleEdit,
    openEdit,
    closeEdit,
    modifySiteDBinfo,
    addSiteDBinfo,
    isMutating,
  } = useSiteDBInfo();

  return (
    <SiteInfo>
      <ConfigTitle
        icon={<CloudServerOutlined />}
        title="Rapid Collector & DataBase ServerInfomation"
        onEdit={openEdit}
        onRefresh={() => {}}
        disabledEdit={false}
        disabledRefresh={false}
        loadingRefresh={false}
      />
      <SiteInfoSection>
        <SitesTable />
      </SiteInfoSection>
      <SiteSettingAddEdit
        isNew={true}
        visible={visibleEdit}
        close={closeEdit}
        data={data}
        apply={addSiteDBinfo}
        applying={isMutating ? true : false}
      />
    </SiteInfo>
  );
}

const style = css``;

const SiteInfo = styled(Row)`
  margin-left: 1.875rem;
  margin-right: 1.875rem;
  margin-top: 0.5rem;
  flex-direction: column;
  width: 100%;
`;
const SiteInfoSection = styled(Row)`
  margin-left: 0.8rem;
  margin-right: 0.8rem;
  margin-top: 0.8rem;
`;
