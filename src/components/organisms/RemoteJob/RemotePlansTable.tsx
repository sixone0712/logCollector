import styled from '@emotion/styled';
import { Badge, Checkbox, Table } from 'antd';
import { CompareFn, TableRowSelection } from 'antd/lib/table/interface';
import { AlignType, DataIndex } from 'rc-table/lib/interface';
import React, { Key, useCallback } from 'react';
import usePlansSetting from '../../../hooks/usePlansSetting';
import useRemoteJob from '../../../hooks/useRemoteJob';
import { compareTableItem } from '../../../lib/util/compareTableItem';
import { RemotePlan } from '../../../types/Status';
import PopupTip from '../../atoms/PopupTip';
import StatusTableHeader from '../StatusTableHeader/StatusTableHeader';

const ColumnTitle = styled.div`
  font-weight: 700;
`;
export type AutoPlansColumnName = 'planName' | 'description' | 'planType' | 'machineCount' | 'targetCount' | 'status';

export type AutoPlansColumnPropsType = {
  [name in AutoPlansColumnName]: {
    key?: Key;
    title?: React.ReactNode;
    dataIndex?: DataIndex;
    align?: AlignType;
    sorter?:
      | boolean
      | CompareFn<RemotePlan>
      | {
          compare?: CompareFn<RemotePlan>;
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
    key: 'plan_type',
    title: <ColumnTitle>Type</ColumnTitle>,
    dataIndex: 'planType',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'planType'),
    },
  },
  machineCount: {
    key: 'machines',
    title: <ColumnTitle>Machines</ColumnTitle>,
    dataIndex: 'machineCount',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'machineCount'),
    },
  },
  targetCount: {
    key: 'targets',
    title: <ColumnTitle>Targets</ColumnTitle>,
    dataIndex: 'targetCount',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'targetCount'),
    },
  },
  status: {
    key: 'status',
    title: <ColumnTitle>Status</ColumnTitle>,
    dataIndex: 'status',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'status'),
    },
  },
};

export type RemotePlansTableProps = {};

export default function RemotePlansTable() {
  const { plans, refreshPlans, isFetching } = usePlansSetting();
  const { selectPlans, setSelectPlans, onBack, selectSite } = useRemoteJob();

  const statusRender = useCallback((value: string, record: RemotePlan, index: number, type?: AutoPlansColumnName) => {
    return <Badge status={value === 'stop' ? 'processing' : 'error'} text={value === 'stop' ? 'Stopped' : 'Running'} />;
  }, []);

  const mahcinesRender = useCallback(
    (value: number, record: RemotePlan, index: number, type?: AutoPlansColumnName) =>
      PopupTip({ value, list: record.machineNames }),
    []
  );

  const targetsRender = useCallback(
    (value: number, record: RemotePlan, index: number, type?: AutoPlansColumnName) =>
      PopupTip({ value, list: record.targetNames }),
    []
  );

  const titleRender = useCallback(
    () => (
      <StatusTableHeader
        listCount={plans?.length ? plans.length : 0}
        onClickNewJob={onBack}
        onClickRefresh={refreshPlans}
        newBtn={false}
        refreshBtn={true}
        isLoading={isFetching}
        disabled={!selectSite?.value}
      />
    ),
    [plans, isFetching]
  );

  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: RemotePlan[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    setSelectPlans(selectedRowKeys);
  };

  const toggleSelectAll = useCallback(() => {
    if (plans && plans.length > 0)
      setSelectPlans(selectPlans.length === plans.length ? [] : plans.map((r: RemotePlan) => r.planId));
  }, [plans, selectPlans]);

  const allCheckbox = (
    <Checkbox
      checked={selectPlans.length ? true : false}
      indeterminate={plans && selectPlans.length > 0 && selectPlans.length < plans.length}
      onChange={toggleSelectAll}
    />
  );

  const rowSelection: TableRowSelection<RemotePlan> = {
    type: 'checkbox',
    selectedRowKeys: selectPlans,
    onChange: onSelectChange,
    columnTitle: allCheckbox,
  };

  return (
    <Table<RemotePlan>
      rowKey={'planId'}
      rowSelection={rowSelection}
      dataSource={plans}
      bordered
      title={titleRender}
      size="middle"
      pagination={{
        position: ['bottomCenter'],
        total: plans?.length,
      }}
      loading={isFetching}
    >
      <Table.Column<RemotePlan> {...remotePlansColumnProps.planName} />
      <Table.Column<RemotePlan> {...remotePlansColumnProps.description} />
      <Table.Column<RemotePlan> {...remotePlansColumnProps.planType} />
      <Table.Column<RemotePlan> {...remotePlansColumnProps.machineCount} render={mahcinesRender} />
      <Table.Column<RemotePlan> {...remotePlansColumnProps.targetCount} render={targetsRender} />
      <Table.Column<RemotePlan> {...remotePlansColumnProps.status} render={statusRender} />
    </Table>
  );
}
