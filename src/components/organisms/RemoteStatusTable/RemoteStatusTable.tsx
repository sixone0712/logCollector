import { blue } from '@ant-design/colors';
import { DeleteOutlined, EditOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Table } from 'antd';
import { CompareFn } from 'antd/lib/table/interface';
import { AlignType, DataIndex } from 'rc-table/lib/interface';
import React, { Key, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useRemoteStatus from '../../../hooks/useRemoteStatus';
import { compareTableItem } from '../../../lib/util/compareTableItem';
import StatusItem from '../../atoms/StatusItem';
import StatusTableHeader from '../StatusTableHeader/StatusTableHeader';

export type BuildStatus = 'success' | 'failure' | 'notbuild';

export interface RemoteStatus {
  no: number;
  siteName: string;
  collectStatus: BuildStatus;
  errorStatus: BuildStatus;
  crasStatus: BuildStatus;
  versionStatus: BuildStatus;
  isRunning: boolean;
}

type RemoteColumnName =
  | 'no'
  | 'siteName'
  | 'collectStatus'
  | 'errorStatus'
  | 'crasStatus'
  | 'versionStatus'
  | 'isRunning'
  | 'edit'
  | 'delete';

type RemoteColumnPropsType = {
  [name in RemoteColumnName]: {
    key?: Key;
    title?: React.ReactNode;
    dataIndex?: DataIndex;
    align?: AlignType;
    sorter?:
      | boolean
      | CompareFn<RemoteStatus>
      | {
          compare?: CompareFn<RemoteStatus>;
          /** Config multiple sorter order priority */
          multiple?: number;
        };
  };
};

const ColumnTitle = styled.div`
  font-weight: 700;
`;

const remoteColumnProps: RemoteColumnPropsType = {
  no: {
    key: 'no',
    title: <ColumnTitle>No</ColumnTitle>,
    dataIndex: 'no',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'no'),
    },
  },
  siteName: {
    key: 'siteName',
    title: <ColumnTitle>Site Name</ColumnTitle>,
    dataIndex: 'siteName',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'siteName'),
    },
  },
  collectStatus: {
    key: 'collectStatus',
    title: (
      <ColumnTitle>
        Status
        <br />
        (Collect/Convert/Insert)
      </ColumnTitle>
    ),
    dataIndex: 'collectStatus',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'collectStatus'),
    },
  },
  errorStatus: {
    key: 'errorStatus',
    title: <ColumnTitle>Send Error Summary</ColumnTitle>,
    dataIndex: 'errorStatus',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'errorStatus'),
    },
  },
  crasStatus: {
    key: 'crasStatus',
    title: <ColumnTitle>Create Cras Data</ColumnTitle>,
    dataIndex: 'crasStatus',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'crasStatus'),
    },
  },
  versionStatus: {
    key: 'versionStatus',
    title: <ColumnTitle>Version Check</ColumnTitle>,
    dataIndex: 'versionStatus',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'versionStatus'),
    },
  },
  isRunning: {
    key: 'isRunning',
    title: <ColumnTitle>Start/Stop</ColumnTitle>,
    dataIndex: 'isRunning',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'isRunning'),
    },
  },
  edit: {
    key: 'no',
    title: <ColumnTitle>Edit</ColumnTitle>,
    align: 'center',
  },
  delete: {
    key: 'no',
    title: <ColumnTitle>Delete</ColumnTitle>,
    align: 'center',
  },
};

export type RemoteStatusType = 'collect' | 'error' | 'cras' | 'version';

export type RemoteStatusTableProps = {
  children?: React.ReactNode;
};

export default function RemoteStatusTable({ children }: RemoteStatusTableProps): JSX.Element {
  const { remoteList, setRemoteList } = useRemoteStatus();
  const history = useHistory();

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
    (value: BuildStatus, record: RemoteStatus, index: number, type?: RemoteStatusType) => (
      <StatusItem
        status={value}
        onClick={() => {
          history.push(`/status/remote/${type}/${record.no}?name=${record.siteName}`);
        }}
      />
    ),
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

  const titleRender = useCallback(() => <StatusTableHeader listCount={remoteList.length} />, [remoteList.length]);

  return (
    <Table<RemoteStatus>
      dataSource={remoteList}
      bordered
      title={titleRender}
      size="middle"
      pagination={{
        position: ['bottomCenter'],
        total: 500,
      }}
    >
      <Table.Column<RemoteStatus> {...remoteColumnProps.no} />
      <Table.Column<RemoteStatus> {...remoteColumnProps.siteName} />
      <Table.Column<RemoteStatus> {...remoteColumnProps.collectStatus} render={collectStatusRender} />
      <Table.Column<RemoteStatus> {...remoteColumnProps.errorStatus} render={errorStatusRender} />
      <Table.Column<RemoteStatus> {...remoteColumnProps.crasStatus} render={crasStatusRender} />
      <Table.Column<RemoteStatus> {...remoteColumnProps.versionStatus} render={versionStatusRender} />
      <Table.Column<RemoteStatus> {...remoteColumnProps.isRunning} render={startAndStopRender} />
      <Table.Column<RemoteStatus> {...remoteColumnProps.edit} render={editRender} />
      <Table.Column<RemoteStatus> {...remoteColumnProps.delete} render={deleteRender} />
    </Table>
  );
}

const iconStyle = css`
  font-size: 1.25rem;
  &:hover {
    color: ${blue[4]};
  }
  &:active {
    color: ${blue[6]};
  }
`;