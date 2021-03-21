import { blue } from '@ant-design/colors';
import { DeleteOutlined, EditOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Table } from 'antd';
import { CompareFn, TableRowSelection } from 'antd/lib/table/interface';
import { AlignType, DataIndex } from 'rc-table/lib/interface';
import React, { Key, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import usePlansSetting, { AutoPlanType } from '../../../hooks/usePlansSetting';
import { compareTableItem } from '../../../lib/util/compareTableItem';
import { BuildStatus, RemoteStatus, RemoteStatusType } from '../../../types/Status';
import StatusBadge from '../../atoms/StatusBadge';
import StatusTableHeader from '../StatusTableHeader/StatusTableHeader';

const ColumnTitle = styled.div`
  font-weight: 700;
`;

export type AutoPlansColumnName = 'planName' | 'description' | 'planType' | 'machines' | 'targets';

export type AutoPlansColumnPropsType = {
  [name in AutoPlansColumnName]: {
    key?: Key;
    title?: React.ReactNode;
    dataIndex?: DataIndex;
    align?: AlignType;
    sorter?:
      | boolean
      | CompareFn<AutoPlanType>
      | {
          compare?: CompareFn<AutoPlanType>;
          /** Config multiple sorter order priority */
          multiple?: number;
        };
  };
};

const remotePlansColumnProps: AutoPlansColumnPropsType = {
  planName: {
    key: 'planName',
    title: <ColumnTitle>Plan Name</ColumnTitle>,
    dataIndex: 'planName',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'planName'),
    },
  },
  description: {
    key: 'description',
    title: <ColumnTitle>Description</ColumnTitle>,
    dataIndex: 'description',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'description'),
    },
  },
  planType: {
    key: 'planType',
    title: <ColumnTitle>Type</ColumnTitle>,
    dataIndex: 'planType',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'planType'),
    },
  },
  machines: {
    key: 'machines',
    title: <ColumnTitle>Machines</ColumnTitle>,
    dataIndex: 'machines',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'machines'),
    },
  },
  targets: {
    key: 'targets',
    title: <ColumnTitle>Targets</ColumnTitle>,
    dataIndex: 'targets',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'targets'),
    },
  },
};

export type RemotePlansTableProps = {
  children?: React.ReactNode;
};

export default function RemotePlansTable({ children }: RemotePlansTableProps) {
  const { plans, selectedPlans, setSelectedPlans, refreshPlans } = usePlansSetting();
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
    (value: BuildStatus, record: RemoteStatus, index: number, type?: RemoteStatusType) => {
      const onClick = useCallback(
        () => history.push(`/status/remote/${type}/${record.no}?name=${record.siteName}`),
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
        listCount={plans.length}
        onClickNewJob={moveToRemoteNewJob}
        onClickRefresh={refreshPlans}
        newBtn={false}
        refreshBtn={true}
      />
    ),
    [plans.length]
  );

  const rowSelection: TableRowSelection<AutoPlanType> = {
    type: 'checkbox',
    selectedRowKeys: selectedPlans,
    onChange: (selectedRowKeys: React.Key[], selectedRows: AutoPlanType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedPlans([...selectedRowKeys]);
    },
  };

  return (
    <Table<AutoPlanType>
      rowSelection={{ ...rowSelection }}
      dataSource={plans}
      bordered
      title={titleRender}
      size="middle"
      pagination={{
        position: ['bottomCenter'],
        total: plans.length,
      }}
    >
      <Table.Column<AutoPlanType> {...remotePlansColumnProps.planName} />
      <Table.Column<AutoPlanType> {...remotePlansColumnProps.description} />
      <Table.Column<AutoPlanType> {...remotePlansColumnProps.planType} />
      <Table.Column<AutoPlanType> {...remotePlansColumnProps.machines} />
      <Table.Column<AutoPlanType> {...remotePlansColumnProps.targets} />
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
