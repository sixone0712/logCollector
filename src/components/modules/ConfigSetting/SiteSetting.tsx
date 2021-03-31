import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import ConfigTitle from './ConfigTitle';
import { CloudServerOutlined } from '@ant-design/icons';

export type SiteSettingProps = {
  children?: React.ReactNode;
};

export default function SiteSetting({ children }: SiteSettingProps): JSX.Element {
  return (
    <SiteInfo>
      <ConfigTitle
        icon={<CloudServerOutlined />}
        title="Rapid Collector & DataBase ServerInfomation"
        onEdit={() => {}}
        onRefresh={() => {}}
        disabledEdit={false}
        disabledRefresh={false}
        loadingRefresh={false}
      />
      <SiteInfoSection></SiteInfoSection>
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
const SiteInfoSection = styled(Row)``;
