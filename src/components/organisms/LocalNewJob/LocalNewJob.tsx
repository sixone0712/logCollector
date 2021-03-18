import { DesktopOutlined, NotificationOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Col, Modal, PageHeader, Row, Space } from 'antd';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import useAddLocalJob from '../../../hooks/useAddLocalJob';
import StepButton from '../../atoms/StepButton';
import LocalConfigure from './LocalConfigure';
import LocalConfirm from './LocalConfirm';
import LocalStep from './LocalStep';

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

export const LOCAL_ERROR = {
  NOT_SELECTED_SITE: 0,
  NOT_UPLOADED_FILES: 1,
};

export default function LocalNewJob({ children }: LocalNewJobProps): JSX.Element {
  const { current, setCurrent, selectSite, setSelectSite, uploadFiles, setUploadFiles } = useAddLocalJob();
  const [modal, contextHolder] = Modal.useModal();
  const history = useHistory();

  console.log('uploadFiles', uploadFiles);
  console.log('selectSite', selectSite);

  const modalWarning = useCallback((reason: number) => {
    let content = '';
    switch (reason) {
      case LOCAL_ERROR.NOT_SELECTED_SITE:
        content = 'Please select a site.';
        break;
      case LOCAL_ERROR.NOT_UPLOADED_FILES:
        content = 'Please load a file.';
        break;
    }

    modal.warning({
      title: 'Error',
      content,
    });
  }, []);

  const modalConfirm = useCallback(() => {
    modal.confirm({
      title: 'Add Local Job',
      content: 'Are you sure to add local job?',
      onOk() {
        onBack();
      },
      onCancel() {
        console.log('cancel');
      },
    });
  }, []);

  const nextAction = useCallback(() => {
    if (current === LOCAL_STEP.CONFIGURE) {
      if (selectSite === 'Select a site') {
        modalWarning(LOCAL_ERROR.NOT_SELECTED_SITE);
        return false;
      } else if (uploadFiles.length === 0) {
        modalWarning(LOCAL_ERROR.NOT_UPLOADED_FILES);
        return false;
      }
    } else {
      modalConfirm();
      return true;
    }

    return true;
  }, [current, selectSite, uploadFiles]);

  const onBack = useCallback(() => {
    history.push('/status/local');
  }, []);

  return (
    <Container>
      <PageHeader onBack={onBack} title="Item Setting(Local)" />
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
            {current > LOCAL_STEP.CONFIGURE && <LocalConfirm selectSite={selectSite} uploadFiles={uploadFiles} />}
          </Main>
        </Settings>
      </Contents>
      <div>{contextHolder}</div>
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
