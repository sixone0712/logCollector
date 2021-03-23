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
import { BuildStatus, RemoteStatus, RemoteStatusType, ResRemotePlans } from '../../../types/Status';
import StatusBadge from '../../atoms/StatusBadge';
import StatusTableHeader from '../StatusTableHeader/StatusTableHeader';

const ColumnTitle = styled.div`
  font-weight: 700;
`;

export type AutoPlansColumnName = 'plan_name' | 'description' | 'plan_type' | 'machines' | 'targets';

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
        () => history.push(`/status/remote/${type}/${record.index}?name=${record.siteName}`),
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
        listCount={plans?.length ? plans.length : 0}
        onClickNewJob={moveToRemoteNewJob}
        onClickRefresh={refreshPlans}
        newBtn={false}
        refreshBtn={true}
      />
    ),
    [plans?.length]
  );

  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: ResRemotePlans[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    setSelectedPlans(selectedRowKeys);
  };

  const rowSelection: TableRowSelection<ResRemotePlans> = {
    type: 'checkbox',
    selectedRowKeys: selectedPlans,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL],
  };

  return (
    <Table<ResRemotePlans>
      rowSelection={rowSelection}
      dataSource={plans}
      bordered
      title={titleRender}
      size="middle"
      pagination={{
        position: ['bottomCenter'],
        total: plans?.length,
      }}
    >
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.plan_name} />
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.description} />
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.plan_type} />
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.machines} />
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.targets} />
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
