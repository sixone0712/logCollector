import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Badge, Checkbox, Table, Tooltip, Row, Col } from 'antd';
import { CompareFn, TableRowSelection } from 'antd/lib/table/interface';
import { AlignType, DataIndex } from 'rc-table/lib/interface';
import React, { Key, useCallback } from 'react';
import usePlansSetting from '../../../hooks/usePlansSetting';
import useRemoteJob from '../../../hooks/useRemoteJob';
import { compareTableItem } from '../../../lib/util/compareTableItem';
import { ResRemotePlans } from '../../../types/Status';
import PopupTip from '../../atoms/PopupTip';
import StatusTableHeader from '../StatusTableHeader/StatusTableHeader';

const ColumnTitle = styled.div`
  font-weight: 700;
`;

export type AutoPlansColumnName = 'plan_name' | 'description' | 'plan_type' | 'machines' | 'targets' | 'status';

export type AutoPlansColumnPropsType = {
  [name in AutoPlansColumnName]: {
    key?: Key;
    title?: React.ReactNode;
    dataIndex?: DataIndex;
    align?: AlignType;
    sorter?:
      | boolean
      | CompareFn<ResRemotePlans>
      | {
          compare?: CompareFn<ResRemotePlans>;
          /** Config multiple sorter order priority */
          multiple?: number;
        };
  };
};

const remotePlansColumnProps: AutoPlansColumnPropsType = {
  plan_name: {
    key: 'plan_name',
    title: <ColumnTitle>Plan Name</ColumnTitle>,
    dataIndex: 'plan_name',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'plan_name'),
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
  plan_type: {
    key: 'plan_type',
    title: <ColumnTitle>Type</ColumnTitle>,
    dataIndex: 'plan_type',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'plan_type'),
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

  const statusRender = useCallback(
    (value: string, record: ResRemotePlans, index: number, type?: AutoPlansColumnName) => {
      return (
        <Badge status={value === 'stop' ? 'processing' : 'error'} text={value === 'stop' ? 'Stopped' : 'Running'} />
      );
    },
    []
  );

  const mahcinesRender = useCallback(
    (value: number, record: ResRemotePlans, index: number, type?: AutoPlansColumnName) =>
      PopupTip({ value, list: record.machine_names }),
    []
  );

  const targetsRender = useCallback(
    (value: number, record: ResRemotePlans, index: number, type?: AutoPlansColumnName) =>
      PopupTip({ value, list: record.target_names }),
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

  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: ResRemotePlans[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    setSelectPlans(selectedRowKeys);
  };

  const toggleSelectAll = useCallback(() => {
    if (plans && plans.length > 0)
      setSelectPlans(selectPlans.length === plans.length ? [] : plans.map((r: ResRemotePlans) => r.plan_id));
  }, [plans, selectPlans]);

  const allCheckbox = (
    <Checkbox
      checked={selectPlans.length ? true : false}
      indeterminate={plans && selectPlans.length > 0 && selectPlans.length < plans.length}
      onChange={toggleSelectAll}
    />
  );

  const rowSelection: TableRowSelection<ResRemotePlans> = {
    type: 'checkbox',
    selectedRowKeys: selectPlans,
    onChange: onSelectChange,
    columnTitle: allCheckbox,
  };

  return (
    <Table<ResRemotePlans>
      rowKey={'plan_id'}
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
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.plan_name} />
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.description} />
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.plan_type} />
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.machines} render={mahcinesRender} />
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.targets} render={targetsRender} />
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.status} render={statusRender} />
    </Table>
  );
}
