import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Col, Row } from 'antd';

export type SiteSettingProps = {
  children?: React.ReactNode;
};

export default function SiteSetting({ children }: SiteSettingProps): JSX.Element {
  return (
    <SiteInfo>
      <TitleSection></TitleSection>
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
`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TitleSection = styled(Row)`
  background: linear-gradient(90deg, #bae7ff 0.87%, rgba(255, 255, 255, 0) 100%);
  height: 3.125rem;
  justify-content: space-between;
`;

const Title = styled(Col)``;
const SiteInfoSection = styled(Row)``;
