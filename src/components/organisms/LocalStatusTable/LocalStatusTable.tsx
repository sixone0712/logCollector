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
import { BuildStatus, LocalColumnPropsType, LocalStatus } from '../../../types/Status';

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
  siteName: {
    key: 'site_name',
    title: <LocalColumnTitle>Site Name</LocalColumnTitle>,
    dataIndex: 'site_name',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'siteName'),
    },
  },
  status: {
    key: 'collect_status',
    title: <LocalColumnTitle>Collect/Convert/Insert</LocalColumnTitle>,
    dataIndex: 'collect_status',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'status'),
    },
  },
  fileName: {
    key: 'file_name',
    title: <LocalColumnTitle>Files</LocalColumnTitle>,
    dataIndex: 'file_name',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'fileName'),
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
    [localListLen]
  );

  const filesRender = useCallback((value: string[], record: LocalStatus, index: number) => {
    const title = () => {
      return value.map((item, idx) => <div key={idx}>{item}</div>);
    };

    return (
      <Tooltip title={title} placement="right" color="cyan">
        <span>{`${value.length ? value.length : 0} files`}</span>
      </Tooltip>
    );
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
    >
      <Table.Column<LocalStatus> {...localColumnProps.index} />
      <Table.Column<LocalStatus> {...localColumnProps.siteName} />
      <Table.Column<LocalStatus> {...localColumnProps.fileName} render={filesRender} />
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
