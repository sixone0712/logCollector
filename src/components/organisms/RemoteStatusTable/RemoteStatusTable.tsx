import { blue } from '@ant-design/colors';
import { DeleteOutlined, EditOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Table } from 'antd';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useRemoteStatus from '../../../hooks/useRemoteStatus';
import { compareTableItem } from '../../../lib/util/compareTableItem';
import StatusBadge from '../../atoms/StatusBadge';
import StatusTableHeader from '../StatusTableHeader/StatusTableHeader';
import { BuildStatus, RemoteColumnPropsType, RemoteStatus, RemoteStatusType } from '../../../types/Status';

const ColumnTitle = styled.div`
  font-weight: 700;
`;

const remoteColumnProps: RemoteColumnPropsType = {
  index: {
    key: 'index',
    title: <ColumnTitle>No</ColumnTitle>,
    dataIndex: 'index',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'index'),
    },
  },
  siteName: {
    key: 'site_name',
    title: <ColumnTitle>Site Name</ColumnTitle>,
    dataIndex: 'site_name',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'siteName'),
    },
  },
  collectStatus: {
    key: 'collect_status',
    title: <ColumnTitle>Collect/Convert/Insert</ColumnTitle>,
    dataIndex: 'collect_status',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'collectStatus'),
    },
  },
  errorStatus: {
    key: 'error_summary_status',
    title: <ColumnTitle>Send Error Summary</ColumnTitle>,
    dataIndex: 'error_summary_status',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'errorStatus'),
    },
  },
  crasStatus: {
    key: 'cras_status',
    title: <ColumnTitle>Create Cras Data</ColumnTitle>,
    dataIndex: 'cras_status',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'crasStatus'),
    },
  },
  versionStatus: {
    key: 'version_check_status',
    title: <ColumnTitle>Version Check</ColumnTitle>,
    dataIndex: 'version_check_status',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'versionStatus'),
    },
  },
  isStop: {
    key: 'stop',
    title: <ColumnTitle>Start/Stop</ColumnTitle>,
    dataIndex: 'stop',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'isRunning'),
    },
  },
  edit: {
    key: 'index',
    title: <ColumnTitle>Edit</ColumnTitle>,
    align: 'center',
  },
  delete: {
    key: 'index',
    title: <ColumnTitle>Delete</ColumnTitle>,
    align: 'center',
  },
};

export type RemoteStatusTableProps = {
  children?: React.ReactNode;
};

export default function RemoteStatusTable({ children }: RemoteStatusTableProps) {
  const { remoteList, isFetching, isError, refreshRemoteList } = useRemoteStatus();
  const remoteListLen = remoteList?.length ? remoteList.length : 0;
  const history = useHistory();

  console.log('isFetching', isFetching);

  const collectStatusRender = useCallback(
    (value: BuildStatus, record: RemoteStatus, index: number) => buildStatusRender(value, record, index, 'collect'),
    []
  );

  const errorStatusRender = useCallback(
    (value: BuildStatus, record: RemoteStatus, index: number) => buildStatusRender(value, record, index, 'error'),
    []
  );

  const crasStatusRender = useCallback(
    (value: BuildStatus, record: RemoteStatus, index: number) => buildStatusRender(value, record, index, 'cras'),
    []
  );

  const versionStatusRender = useCallback(
    (value: BuildStatus, record: RemoteStatus, index: number) => buildStatusRender(value, record, index, 'version'),
    []
  );

  const buildStatusRender = useCallback(
    (value: BuildStatus, record: RemoteStatus, index: number, type?: RemoteStatusType) => {
      const onClick = useCallback(
        () => history.push(`/status/remote/${type}/${record.index}?name=${record.siteName}`),
        []
      );
      return <StatusBadge type={value} onClick={onClick} />;
    },
    []
  );

  const startAndStopRender = useCallback((value: boolean) => {
    if (value) {
      return <PlayCircleOutlined css={iconStyle} />;
    } else {
      return <PauseCircleOutlined css={iconStyle} />;
    }
  }, []);

  const editRender = useCallback(() => {
    return <EditOutlined css={iconStyle} />;
  }, []);

  const deleteRender = useCallback(() => {
    return <DeleteOutlined css={iconStyle} />;
  }, []);

  const moveToRemoteNewJob = useCallback(() => {
    history.push('/status/remote/new');
  }, []);

  const titleRender = useCallback(
    () => (
      <StatusTableHeader
        listCount={remoteListLen}
        onClickNewJob={moveToRemoteNewJob}
        onClickRefresh={refreshRemoteList}
        newBtn={true}
        refreshBtn={true}
        isLoading={isFetching}
      />
    ),
    [remoteListLen, isFetching]
  );

  return (
    <Table<RemoteStatus>
      dataSource={remoteList}
      bordered
      title={titleRender}
      size="middle"
      pagination={{
        position: ['bottomCenter'],
        total: remoteListLen,
        showSizeChanger: true,
      }}
      loading={isFetching}
    >
      <Table.Column<RemoteStatus>
        {...remoteColumnProps.index}
        render={(value) => {
          console.log('value', value);
          return `${value + 1}`;
        }}
      />
      <Table.Column<RemoteStatus> {...remoteColumnProps.siteName} />
      <Table.Column<RemoteStatus> {...remoteColumnProps.collectStatus} render={collectStatusRender} />
      <Table.Column<RemoteStatus> {...remoteColumnProps.errorStatus} render={errorStatusRender} />
      <Table.Column<RemoteStatus> {...remoteColumnProps.crasStatus} render={crasStatusRender} />
      <Table.Column<RemoteStatus> {...remoteColumnProps.versionStatus} render={versionStatusRender} />
      <Table.Column<RemoteStatus> {...remoteColumnProps.isStop} render={startAndStopRender} />
      <Table.Column<RemoteStatus> {...remoteColumnProps.edit} render={editRender} />
      <Table.Column<RemoteStatus> {...remoteColumnProps.delete} render={deleteRender} />
    </Table>
  );
}

const iconStyle = css`
  /* font-size: 1.25rem; */
  &:hover {
    color: ${blue[4]};
  }
  &:active {
    color: ${blue[6]};
  }
`;
