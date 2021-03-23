import { blue } from '@ant-design/colors';
import { DeleteOutlined, EditOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Badge, Checkbox, Table } from 'antd';
import { CompareFn, TableRowSelection } from 'antd/lib/table/interface';
import { AlignType, DataIndex, GetComponentProps } from 'rc-table/lib/interface';
import React, { Key, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import usePlansSetting from '../../../hooks/usePlansSetting';
import { compareTableItem } from '../../../lib/util/compareTableItem';
import { BuildStatus, RemoteStatus, RemoteStatusType, ResRemotePlans } from '../../../types/Status';
import StatusBadge from '../../atoms/StatusBadge';
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
    key: 'target',
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

  const moveToRemoteNewJob = useCallback(() => {
    history.push('/status/remote/new');
  }, []);

  const statusRender = useCallback((value: string, record: ResRemotePlans, index: number) => {
    console.log('value', value);
    return (
      <Badge status={value === 'stop' ? 'error' : 'processing'} text={value === 'stop' ? 'Stopped' : 'Running'}></Badge>
    );
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

  const onSelectChange = useCallback(
    (selectedRowKeys: React.Key[], selectedRows: ResRemotePlans[]) => {
      setSelectedPlans(selectedRowKeys);
    },
    [setSelectedPlans]
  );

  const toggleSelectAll = useCallback(() => {
    if (plans !== undefined) setSelectedPlans((keys) => (keys.length === plans.length ? [] : plans.map((r) => r.key)));
  }, [plans, setSelectedPlans]);

  const headerCheckbox = (
    <Checkbox
      checked={selectedPlans.length ? true : false}
      indeterminate={plans && selectedPlans.length > 0 && selectedPlans.length < plans.length}
      onChange={toggleSelectAll}
    />
  );

  const rowSelection: TableRowSelection<ResRemotePlans> = {
    type: 'checkbox',
    selectedRowKeys: selectedPlans,
    onChange: onSelectChange,
    columnTitle: headerCheckbox,
  };

  const onRow = useCallback(
    (data: ResRemotePlans, index: number | undefined): React.HTMLAttributes<HTMLElement> => {
      return {
        onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
          console.log('row Click');
          if (data.key !== undefined) {
            let newselectedRowKeys;
            if (selectedPlans.find((item) => item === data.key) !== undefined) {
              newselectedRowKeys = selectedPlans.filter((item) => item !== data.key);
            } else {
              newselectedRowKeys = selectedPlans.concat(data.key);
            }
            setSelectedPlans(newselectedRowKeys);
          }
        },
      };
    },
    [selectedPlans, setSelectedPlans]
  );

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
      onRow={onRow}
    >
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.plan_name} />
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.description} />
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.plan_type} />
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.machines} />
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.targets} />
      <Table.Column<ResRemotePlans> {...remotePlansColumnProps.status} render={statusRender} />
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
