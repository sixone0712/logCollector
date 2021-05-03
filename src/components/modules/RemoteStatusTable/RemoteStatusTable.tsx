import { blue } from '@ant-design/colors';
import { DeleteOutlined, EditOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Table } from 'antd';
import React, { useCallback, useMemo } from 'react';
import useRemoteStatus from '../../../hooks/useRemoteStatus';
import { compareTableItem } from '../../../lib/util/compareTableItem';
import { BuildStatus, RemoteColumnPropsType, RemoteJobStatus, RemoteStatusType } from '../../../types/status';
import StatusBadge from '../../atoms/StatusBadge';
import StatusTableHeader from '../StatusTableHeader/StatusTableHeader';

export type RemoteStatusTableProps = {};

export default function RemoteStatusTable() {
  const {
    remoteList,
    isFetching,
    isError,
    refreshRemoteList,
    moveToRemoteNewJob,
    moveToRemoteEditJob,
    moveToRemoteHistory,
  } = useRemoteStatus();

  const remoteListLen = useMemo(() => (remoteList?.length ? remoteList.length : 0), [remoteList?.length]);
  // const remoteListLen = remoteList?.length ? remoteList.length : 0;
  const numberRender = useCallback((value: BuildStatus, record: RemoteJobStatus, index: number) => value + 1, []);

  const collectStatusRender = useCallback(
    (value: BuildStatus, record: RemoteJobStatus, index: number) =>
      buildStatusRender(value, record, index, 'collectStatus'),
    []
  );

  const errorSummaryStatusRender = useCallback(
    (value: BuildStatus, record: RemoteJobStatus, index: number) =>
      buildStatusRender(value, record, index, 'errorSummaryStatus'),
    []
  );

  const crasDataStatusRender = useCallback(
    (value: BuildStatus, record: RemoteJobStatus, index: number) =>
      buildStatusRender(value, record, index, 'crasDataStatus'),
    []
  );

  const mpaVersionStatusRender = useCallback(
    (value: BuildStatus, record: RemoteJobStatus, index: number) =>
      buildStatusRender(value, record, index, 'mpaVersionStatus'),
    []
  );

  const buildStatusRender = useCallback(
    (value: BuildStatus, record: RemoteJobStatus, index: number, type?: RemoteStatusType) => {
      return (
        <StatusBadge
          type={value}
          onClick={() => moveToRemoteHistory(record.id, record.siteFabName, type as RemoteStatusType)}
        />
      );
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

  const editRender = useCallback(
    (value: number, record: RemoteJobStatus, index: number) => (
      <EditOutlined css={iconStyle} onClick={() => moveToRemoteEditJob(record.id, record.siteFabName)} />
    ),
    []
  );

  const deleteRender = useCallback(() => {
    return <DeleteOutlined css={iconStyle} />;
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
    <Table<RemoteJobStatus>
      rowKey={'id'}
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
      <Table.Column<RemoteJobStatus> {...remoteColumnProps.index} render={numberRender} />
      <Table.Column<RemoteJobStatus> {...remoteColumnProps.siteFabName} />
      <Table.Column<RemoteJobStatus> {...remoteColumnProps.collectStatus} render={collectStatusRender} />
      <Table.Column<RemoteJobStatus> {...remoteColumnProps.errorSummaryStatus} render={errorSummaryStatusRender} />
      <Table.Column<RemoteJobStatus> {...remoteColumnProps.crasDataStatus} render={crasDataStatusRender} />
      <Table.Column<RemoteJobStatus> {...remoteColumnProps.mpaVersionStatus} render={mpaVersionStatusRender} />
      <Table.Column<RemoteJobStatus> {...remoteColumnProps.stop} render={startAndStopRender} />
      <Table.Column<RemoteJobStatus> {...remoteColumnProps.edit} render={editRender} />
      <Table.Column<RemoteJobStatus> {...remoteColumnProps.delete} render={deleteRender} />
    </Table>
  );
}

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
  siteFabName: {
    key: 'siteFabName',
    title: <ColumnTitle>Site Name</ColumnTitle>,
    dataIndex: 'siteFabName',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'siteFabName'),
    },
  },
  collectStatus: {
    key: 'collectStatus',
    title: <ColumnTitle>Collect/Convert/Insert</ColumnTitle>,
    dataIndex: 'collectStatus',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'collectStatus'),
    },
  },
  errorSummaryStatus: {
    key: 'errorSummaryStatus',
    title: <ColumnTitle>Send Error Summary</ColumnTitle>,
    dataIndex: 'errorSummaryStatus',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'errorSummaryStatus'),
    },
  },
  crasDataStatus: {
    key: 'crasDataStatus',
    title: <ColumnTitle>Create Cras Data</ColumnTitle>,
    dataIndex: 'crasDataStatus',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'crasDataStatus'),
    },
  },
  mpaVersionStatus: {
    key: 'mpaVersionStatus',
    title: <ColumnTitle>Version Check</ColumnTitle>,
    dataIndex: 'mpaVersionStatus',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'mpaVersionStatus'),
    },
  },
  stop: {
    key: 'stop',
    title: <ColumnTitle>Start/Stop</ColumnTitle>,
    dataIndex: 'stop',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'stop'),
    },
  },
  edit: {
    key: 'id',
    title: <ColumnTitle>Edit</ColumnTitle>,
    dataIndex: 'id',
    align: 'center',
  },
  delete: {
    key: 'id',
    title: <ColumnTitle>Delete</ColumnTitle>,
    dataIndex: 'id',
    align: 'center',
  },
};

const iconStyle = css`
  /* font-size: 1.25rem; */
  &:hover {
    color: ${blue[4]};
  }
  &:active {
    color: ${blue[6]};
  }
`;
