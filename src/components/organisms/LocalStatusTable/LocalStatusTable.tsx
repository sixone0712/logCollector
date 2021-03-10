import { blue } from '@ant-design/colors';
import { DeleteOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Table } from 'antd';
import { CompareFn } from 'antd/lib/table/interface';
import { AlignType, DataIndex } from 'rc-table/lib/interface';
import React, { Key, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStatus from '../../../hooks/useLocalStatus';
import { compareTableItem } from '../../../lib/util/compareTableItem';
import StatusItem from '../../atoms/StatusItem';
import { BuildStatus } from '../RemoteStatusTable/RemoteStatusTable';
import StatusTableHeader from '../StatusTableHeader/StatusTableHeader';

export interface LocalStatus {
  no: number;
  siteName: string;
  status: BuildStatus;
}
export type LocalStatusTableProps = {
  children?: React.ReactNode;
};

const LocalColumnTitle = styled.div`
  font-weight: 700;
`;

type LocalColumnName = 'no' | 'siteName' | 'status' | 'delete';

type LocalColumnPropsType = {
  [name in LocalColumnName]: {
    key?: Key;
    title?: React.ReactNode;
    dataIndex?: DataIndex;
    align?: AlignType;
    sorter?:
      | boolean
      | CompareFn<LocalStatus>
      | {
          compare?: CompareFn<LocalStatus>;
          /** Config multiple sorter order priority */
          multiple?: number;
        };
  };
};

const localColumnProps: LocalColumnPropsType = {
  no: {
    key: 'no',
    title: <LocalColumnTitle>No</LocalColumnTitle>,
    dataIndex: 'no',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'no'),
    },
  },
  siteName: {
    key: 'siteName',
    title: <LocalColumnTitle>Site Name</LocalColumnTitle>,
    dataIndex: 'siteName',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'siteName'),
    },
  },
  status: {
    key: 'status',
    title: <LocalColumnTitle>Status</LocalColumnTitle>,
    dataIndex: 'status',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'status'),
    },
  },

  delete: {
    key: 'no',
    title: <LocalColumnTitle>Delete</LocalColumnTitle>,
    align: 'center',
  },
};

export default function LocalStatusTable({ children }: LocalStatusTableProps): JSX.Element {
  const { localList, setLocalList } = useLocalStatus();
  const history = useHistory();

  const buildStatusRender = useCallback(
    (value: BuildStatus, record: LocalStatus, index: number) => (
      <StatusItem
        status={value}
        onClick={() => {
          history.push(`/status/local/${record.no}?name=${record.siteName}`);
        }}
      />
    ),
    []
  );

  const deleteRender = useCallback(() => {
    return <DeleteOutlined css={iconStyle} />;
  }, []);

  const titleRender = useCallback(() => <StatusTableHeader listCount={localList.length} />, [localList.length]);

  return (
    <Table<LocalStatus>
      dataSource={localList}
      bordered
      title={titleRender}
      size="middle"
      pagination={{
        position: ['bottomCenter'],
        total: 500,
      }}
    >
      <Table.Column<LocalStatus> {...localColumnProps.no} />
      <Table.Column<LocalStatus> {...localColumnProps.siteName} />
      <Table.Column<LocalStatus> {...localColumnProps.status} render={buildStatusRender} />
      <Table.Column<LocalStatus> {...localColumnProps.delete} render={deleteRender} />
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
