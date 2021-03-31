import React from 'react';
import { css } from '@emotion/react';
import HostDBSetting from './HostDBSetting';
import SiteSetting from './SiteSetting';
import styled from '@emotion/styled';
import { Row } from 'antd';

export type ConfigureProps = {
  children?: React.ReactNode;
};

export default function ConfigSetting({ children }: ConfigureProps): JSX.Element {
  return (
    <div css={style}>
      <HostDBSection>
        <HostDBSetting />
      </HostDBSection>
      <SiteSection>
        <SiteSetting />
      </SiteSection>
    </div>
  );
}

const style = css``;

const HostDBSection = styled(Row)``;
const SiteSection = styled(Row)`
  margin-top: 2rem;
`;
