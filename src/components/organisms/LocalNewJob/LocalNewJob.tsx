import { DesktopOutlined, NotificationOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Col, PageHeader, Row, Space } from 'antd';
import React, { useCallback, useState } from 'react';
import StepButton from '../../atoms/StepButton';
import LocalConfirm from './LocalConfirm';
import LocalConfigure from './LocalConfigure';
import LocalStep from './LocalStep';
import { createImportSpecifier } from 'typescript';

export type LocalNewJobProps = {
  children?: React.ReactNode;
};

const Container = styled(Row)`
  /* display: flex; */
  flex-direction: column;
  background-color: white;
  width: inherit;
`;

const Contents = styled(Row)`
  /* display: flex; */
  margin-left: 1.75rem;
  margin-right: 1.75rem;
  margin-top: 1.875rem;
  flex-wrap: nowrap;
  /* flex-direction: row; */
`;

const SettingsTitle = styled(Row)`
  margin-left: 1rem;
  font-size: 1.125rem;
`;

const Main = styled(Col)`
  padding-top: 2.125rem;
  margin-left: 3rem;
`;

const Settings = styled(Col)`
  /* margin-left: 11rem; */
  height: 28.125rem;
  width: 67.1875rem;
`;

export const LOCAL_STEP = {
  CONFIGURE: 0,
  CONFIRM: 1,
};

export default function LocalNewJob({ children }: LocalNewJobProps): JSX.Element {
  const [current, setCurrent] = useState(0);
  const [selectSite, setSelectSite] = useState('default');
  const [uploadFiles, setUploadFiles] = useState<any>([]);

  console.log('uploadFiles', uploadFiles);
  console.log('selectSite', selectSite);

  const nextAction = useCallback(() => {
    if (current === LOCAL_STEP.CONFIGURE) {
      if (selectSite === 'default') {
        console.log('need to select site');
        return false;
      } else if (uploadFiles.length === 0) {
        console.log('need to upload files');
        return false;
      }
    }
    return true;
  }, [current, selectSite, uploadFiles]);

  return (
    <Container>
      <PageHeader onBack={() => null} title="SettingsTitle" />
      <Contents>
        <LocalStep current={current} />
        <Settings>
          <SettingsTitle justify="space-between" align="middle">
            <Title current={current} />
            <StepButton
              current={current}
              setCurrent={setCurrent}
              lastStep={LOCAL_STEP.CONFIRM}
              nextAction={nextAction}
            />
          </SettingsTitle>
          <Main>
            {current === LOCAL_STEP.CONFIGURE && (
              <LocalConfigure
                selectSite={selectSite}
                setSelectSite={setSelectSite}
                uploadFiles={uploadFiles}
                setUploadFiles={setUploadFiles}
              />
            )}
            {current > LOCAL_STEP.CONFIGURE && <LocalConfirm />}
          </Main>
        </Settings>
      </Contents>
    </Container>
  );
}

interface TitleProps {
  current: number;
}
function Title({ current }: TitleProps) {
  const { icon, text } = getTitle(current);

  return (
    <Space>
      {icon}
      <span>{text}</span>
    </Space>
  );
}

function getTitle(current: number) {
  switch (current) {
    case 0:
      return {
        icon: <DesktopOutlined />,
        text: 'Configure',
      };
    case 1:
    default:
      return {
        icon: <NotificationOutlined />,
        text: 'Check Settings',
      };
  }
}

const style = css``;
