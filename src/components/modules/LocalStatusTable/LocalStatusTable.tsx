import { blue } from '@ant-design/colors';
import { DeleteOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Col, Row, Table, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStatus from '../../../hooks/useLocalStatus';
import { compareTableItem } from '../../../lib/util/compareTableItem';
import StatusBadge from '../../atoms/StatusBadge';
import StatusTableHeader from '../StatusTableHeader/StatusTableHeader';
import { BuildStatus, LocalColumnPropsType, LocalStatus } from '../../../types/status';
import PopupTip from '../../atoms/PopupTip';

export type LocalStatusTableProps = {
  children?: React.ReactNode;
};

const LocalColumnTitle = styled.div`
  font-weight: 700;
`;

const localColumnProps: LocalColumnPropsType = {
  index: {
    key: 'index',
    title: <LocalColumnTitle>No</LocalColumnTitle>,
    dataIndex: 'index',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'index'),
    },
  },
  siteFabName: {
    key: 'siteFabName',
    title: <LocalColumnTitle>Site Name</LocalColumnTitle>,
    dataIndex: 'siteFabName',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'siteFabName'),
    },
  },
  status: {
    key: 'collectStatus',
    title: <LocalColumnTitle>Collect/Convert/Insert</LocalColumnTitle>,
    dataIndex: 'collect_status',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'collectStatus'),
    },
  },
  files: {
    key: 'files',
    title: <LocalColumnTitle>Files</LocalColumnTitle>,
    dataIndex: 'files',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'files'),
    },
  },
  delete: {
    key: 'index',
    title: <LocalColumnTitle>Delete</LocalColumnTitle>,
    align: 'center',
  },
};

export default function LocalStatusTable({ children }: LocalStatusTableProps) {
  const { localList, isFetching, isError, refreshRemoteList } = useLocalStatus();
  const localListLen = localList?.length ? localList.length : 0;
  const history = useHistory();

  const buildStatusRender = useCallback((value: BuildStatus, record: LocalStatus, index: number) => {
    const onClick = useCallback(
      () => history.push(`/status/local/collect/${record.index}?name=${record.siteName}`),
      []
    );
    return <StatusBadge type={value} onClick={onClick} />;
  }, []);

  const deleteRender = useCallback(() => {
    return <DeleteOutlined css={iconStyle} />;
  }, []);

  const titleRender = useCallback(
    () => (
      <StatusTableHeader
        listCount={localListLen}
        onClickNewJob={moveToLocalNewJob}
        onClickRefresh={refreshRemoteList}
        newBtn={true}
        refreshBtn={true}
        isLoading={isFetching}
      />
    ),
    [localListLen, isFetching]
  );

  const filesRender = useCallback((value: string[], record: LocalStatus, index: number) => {
    return PopupTip({ value: `${value} files`, list: record.fileNames });
  }, []);

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
        total: localListLen,
      }}
      loading={isFetching}
      rowKey="id"
    >
      <Table.Column<LocalStatus> {...localColumnProps.index} />
      <Table.Column<LocalStatus> {...localColumnProps.siteFabName} />
      <Table.Column<LocalStatus> {...localColumnProps.files} render={filesRender} />
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
