import { blue } from '@ant-design/colors';
import { DeleteOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Table } from 'antd';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStatus from '../../../hooks/useLocalStatus';
import { compareTableItem } from '../../../lib/util/compareTableItem';
import StatusBadge from '../../atoms/StatusBadge';
import StatusTableHeader from '../StatusTableHeader/StatusTableHeader';
import { BuildStatus, LocalColumnPropsType, LocalStatus } from '../../../types/Status';

export type LocalStatusTableProps = {
  children?: React.ReactNode;
};

const LocalColumnTitle = styled.div`
  font-weight: 700;
`;

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

export default function LocalStatusTable({ children }: LocalStatusTableProps) {
  const { localList, setLocalList, refreshRemoteList } = useLocalStatus();
  const history = useHistory();

  const buildStatusRender = useCallback((value: BuildStatus, record: LocalStatus, index: number) => {
    const onClick = useCallback(() => history.push(`/status/local/history/${record.no}?name=${record.siteName}`), []);
    return <StatusBadge type={value} onClick={onClick} />;
  }, []);

  const deleteRender = useCallback(() => {
    return <DeleteOutlined css={iconStyle} />;
  }, []);

  const titleRender = useCallback(
    () => (
      <StatusTableHeader
        listCount={localList.length}
        onClickNewJob={moveToLocalNewJob}
        onClickRefresh={refreshRemoteList}
      />
    ),
    [localList.length]
  );

  const moveToLocalNewJob = useCallback(() => {
    history.push('/status/local/new');
  }, []);

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
