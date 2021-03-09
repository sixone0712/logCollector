import { DeleteOutlined, EditOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Table } from 'antd';
import React, { Key, useCallback } from 'react';
import { AlignType, DataIndex } from '../../../../node_modules/rc-table/lib/interface';
import useRemoteStatus from '../../../hooks/useRemoteStatus';
import StatusItem from '../../atoms/StatusItem';
import StatusHeader from './StatusHeader';

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
export type StatusTableProps = {
  children?: React.ReactNode;
};

type ColumnName =
  | 'no'
  | 'siteName'
  | 'collectStatus'
  | 'errorStatus'
  | 'crasStatus'
  | 'versionStatus'
  | 'isRunning'
  | 'edit'
  | 'delete';

type ColumnPropsType = {
  [name in ColumnName]: {
    key?: Key;
    title?: React.ReactNode;
    dataIndex?: DataIndex;
    align?: AlignType;
  };
};

const ColumnTitle = styled.div`
  font-weight: 700;
`;

const columnProps: ColumnPropsType = {
  no: {
    key: 'no',
    title: <ColumnTitle>No</ColumnTitle>,
    dataIndex: 'no',
    align: 'center',
  },
  siteName: {
    key: 'siteName',
    title: <ColumnTitle>Site Name</ColumnTitle>,
    dataIndex: 'siteName',
    align: 'center',
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
  },
  errorStatus: {
    key: 'errorStatus',
    title: <ColumnTitle>Send Error Summary</ColumnTitle>,
    dataIndex: 'errorStatus',
    align: 'center',
  },
  crasStatus: {
    key: 'crasStatus',
    title: <ColumnTitle>Create Cras Data</ColumnTitle>,
    dataIndex: 'crasStatus',
    align: 'center',
  },
  versionStatus: {
    key: 'versionStatus',
    title: <ColumnTitle>Check Cras Version</ColumnTitle>,
    dataIndex: 'versionStatus',
    align: 'center',
  },
  isRunning: {
    key: 'isRunning',
    title: <ColumnTitle>Start/Stop</ColumnTitle>,
    dataIndex: 'isRunning',
    align: 'center',
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

export default function StatusTable({ children }: StatusTableProps): JSX.Element {
  const { remoteList, setRemoteList } = useRemoteStatus();

  const buildStatusRender = useCallback((value: BuildStatus) => {
    switch (value) {
      case 'success':
        return <StatusItem status={value} />;
      case 'failure':
        return <StatusItem status={value} />;
      case 'notbuild':
        return <StatusItem status={value} />;
      default:
        return null;
    }
  }, []);
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

  return (
    <Table<RemoteStatus> dataSource={remoteList} bordered title={() => <StatusHeader />}>
      <Table.Column<RemoteStatus> {...columnProps.no} />
      <Table.Column<RemoteStatus> {...columnProps.siteName} />
      <Table.Column<RemoteStatus> {...columnProps.collectStatus} render={buildStatusRender} />
      <Table.Column<RemoteStatus> {...columnProps.errorStatus} render={buildStatusRender} />
      <Table.Column<RemoteStatus> {...columnProps.crasStatus} render={buildStatusRender} />
      <Table.Column<RemoteStatus> {...columnProps.versionStatus} render={buildStatusRender} />
      <Table.Column<RemoteStatus> {...columnProps.isRunning} render={startAndStopRender} />
      <Table.Column<RemoteStatus> {...columnProps.edit} render={editRender} />
      <Table.Column<RemoteStatus> {...columnProps.delete} render={deleteRender} />
    </Table>
  );
}

const iconStyle = css`
  font-size: 1.25rem;
`;
