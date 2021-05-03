import { blue } from '@ant-design/colors';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Table } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { ResGetSiteDBInfo } from '../../../lib/api/axios/types';
import { compareTableItem } from '../../../lib/util/compareTableItem';
import { SiteDBInfo, SiteDBInfoColumnPropsType } from '../../../types/configure';

export type SitesTableProps = {};

export default function SitesTable() {
  const siteListLen = useMemo(() => (dummyData?.length ? dummyData.length : 0), [dummyData?.length]);

  const numberRender = useCallback((value: number, record: ResGetSiteDBInfo, index: number) => value + 1, []);

  const editRender = useCallback(
    (value: number, record: ResGetSiteDBInfo, index: number) => <EditOutlined css={iconStyle} onClick={() => {}} />,
    []
  );

  const deleteRender = useCallback(() => {
    return <DeleteOutlined css={iconStyle} />;
  }, []);

  return (
    <Table<ResGetSiteDBInfo>
      rowKey={'id'}
      dataSource={dummyData}
      bordered
      size="small"
      css={tableStyle}
      scroll={{ x: 1304 }}
      sticky={true}
      pagination={{
        position: ['bottomCenter'],
        total: siteListLen,
        showSizeChanger: true,
      }}
    >
      <Table.Column<ResGetSiteDBInfo> {...siteDBInfoColumnProps.index} width={64} render={numberRender}></Table.Column>
      <Table.ColumnGroup<ResGetSiteDBInfo> {...siteDBInfoColumnProps.rapidCollector}>
        <Table.Column<ResGetSiteDBInfo> {...siteDBInfoColumnProps.siteName} width={220}></Table.Column>
        <Table.Column<ResGetSiteDBInfo> {...siteDBInfoColumnProps.fabName} width={220}></Table.Column>
        <Table.Column<ResGetSiteDBInfo> {...siteDBInfoColumnProps.address} width={150}></Table.Column>
        <Table.Column<ResGetSiteDBInfo> {...siteDBInfoColumnProps.port} width={80}></Table.Column>
        <Table.Column<ResGetSiteDBInfo> {...siteDBInfoColumnProps.user} width={200}></Table.Column>
      </Table.ColumnGroup>
      <Table.ColumnGroup<ResGetSiteDBInfo> {...siteDBInfoColumnProps.dbServer}>
        <Table.Column<ResGetSiteDBInfo> {...siteDBInfoColumnProps.dbAddress} width={150}></Table.Column>
        <Table.Column<ResGetSiteDBInfo> {...siteDBInfoColumnProps.dbPort} width={80}></Table.Column>
        <Table.Column<ResGetSiteDBInfo> {...siteDBInfoColumnProps.dbUser} width={220}></Table.Column>
      </Table.ColumnGroup>
      <Table.Column<ResGetSiteDBInfo> {...siteDBInfoColumnProps.edit} width={70} render={editRender}></Table.Column>
      <Table.Column<ResGetSiteDBInfo> {...siteDBInfoColumnProps.delete} width={70} render={deleteRender}></Table.Column>
    </Table>
  );
}

const ColumnTitle = styled.div`
  font-weight: 700;
`;

const siteDBInfoColumnProps: SiteDBInfoColumnPropsType = {
  index: {
    key: 'index',
    title: <ColumnTitle>No</ColumnTitle>,
    dataIndex: 'index',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'index'),
    },
    fixed: 'left',
  },
  rapidCollector: {
    key: 'none',
    title: <ColumnTitle>Rapid Collector</ColumnTitle>,
  },
  siteName: {
    key: 'siteName',
    title: <ColumnTitle>Site Name</ColumnTitle>,
    dataIndex: 'siteName',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'siteName'),
    },
  },
  fabName: {
    key: 'fabName',
    title: <ColumnTitle>Fab Name</ColumnTitle>,
    dataIndex: 'fabName',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'fabName'),
    },
  },
  address: {
    key: 'address',
    title: <ColumnTitle>IP Address</ColumnTitle>,
    dataIndex: 'address',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'address'),
    },
  },
  port: {
    key: 'port',
    title: <ColumnTitle>Port</ColumnTitle>,
    dataIndex: 'port',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'port'),
    },
  },
  user: {
    key: 'user',
    title: <ColumnTitle>User</ColumnTitle>,
    dataIndex: 'user',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'user'),
    },
  },
  dbServer: {
    title: <ColumnTitle>Database Server</ColumnTitle>,
  },
  dbAddress: {
    key: 'dbAddress',
    title: <ColumnTitle>IP Address</ColumnTitle>,
    dataIndex: 'dbAddress',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'dbAddress'),
    },
  },
  dbPort: {
    key: 'dbPort',
    title: <ColumnTitle>Port</ColumnTitle>,
    dataIndex: 'dbPort',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'dbPort'),
    },
  },
  dbUser: {
    key: 'dbUser',
    title: <ColumnTitle>User</ColumnTitle>,
    dataIndex: 'dbUser',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'dbUser'),
    },
  },
  edit: {
    title: <ColumnTitle>Edit</ColumnTitle>,
    align: 'center',
    fixed: 'right',
  },
  delete: {
    title: <ColumnTitle>Delete</ColumnTitle>,
    align: 'center',
    fixed: 'right',
  },
};

const tableStyle = css`
  width: 81.5rem;
`;

const iconStyle = css`
  /* font-size: 1.25rem; */
  &:hover {
    color: ${blue[4]};
  }
  &:active {
    color: ${blue[6]};
  }
`;

const resDummy = [
  {
    id: 1,
    siteName: 'siteNamedasdfasdfasdfasdfasfdasdfasdfasfdasfasdfasfasdf0',
    fabName: 'fabName_0',
    address: '110.111.311.111',
    port: 65535,
    user: 'chpark_0',
    password: 'password',
    dbAddress: '192.168.111.111',
    dbPort: 65535,
    dbUser: 'Administrator',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 2,
    siteName: 'siteName1',
    fabName: 'fabName_1',
    address: '10.1.31.1',
    port: 80,
    user: 'chpark_1',
    password: 'password',
    dbAddress: '192.168.0.1',
    dbPort: 5432,
    dbUser: 'dbUser_1',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 3,
    siteName: 'siteName2',
    fabName: 'fabName_2',
    address: '10.1.31.2',
    port: 80,
    user: 'chpark_2',
    password: 'password',
    dbAddress: '192.168.0.2',
    dbPort: 5432,
    dbUser: 'dbUser_2',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 4,
    siteName: 'siteName3',
    fabName: 'fabName_3',
    address: '10.1.31.3',
    port: 80,
    user: 'chpark_3',
    password: 'password',
    dbAddress: '192.168.0.3',
    dbPort: 5432,
    dbUser: 'dbUser_3',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 5,
    siteName: 'siteName4',
    fabName: 'fabName_4',
    address: '10.1.31.4',
    port: 80,
    user: 'chpark_4',
    password: 'password',
    dbAddress: '192.168.0.4',
    dbPort: 5432,
    dbUser: 'dbUser_4',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 6,
    siteName: 'siteName5',
    fabName: 'fabName_5',
    address: '10.1.31.5',
    port: 80,
    user: 'chpark_5',
    password: 'password',
    dbAddress: '192.168.0.5',
    dbPort: 5432,
    dbUser: 'dbUser_5',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 7,
    siteName: 'siteName6',
    fabName: 'fabName_6',
    address: '10.1.31.6',
    port: 80,
    user: 'chpark_6',
    password: 'password',
    dbAddress: '192.168.0.6',
    dbPort: 5432,
    dbUser: 'dbUser_6',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 8,
    siteName: 'siteName7',
    fabName: 'fabName_7',
    address: '10.1.31.7',
    port: 80,
    user: 'chpark_7',
    password: 'password',
    dbAddress: '192.168.0.7',
    dbPort: 5432,
    dbUser: 'dbUser_7',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 9,
    siteName: 'siteName8',
    fabName: 'fabName_8',
    address: '10.1.31.8',
    port: 80,
    user: 'chpark_8',
    password: 'password',
    dbAddress: '192.168.0.8',
    dbPort: 5432,
    dbUser: 'dbUser_8',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 10,
    siteName: 'siteName9',
    fabName: 'fabName_9',
    address: '10.1.31.9',
    port: 80,
    user: 'chpark_9',
    password: 'password',
    dbAddress: '192.168.0.9',
    dbPort: 5432,
    dbUser: 'dbUser_9',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 11,
    siteName: 'siteName10',
    fabName: 'fabName_10',
    address: '10.1.31.10',
    port: 80,
    user: 'chpark_10',
    password: 'password',
    dbAddress: '192.168.0.10',
    dbPort: 5432,
    dbUser: 'dbUser_10',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 12,
    siteName: 'siteName11',
    fabName: 'fabName_11',
    address: '10.1.31.11',
    port: 80,
    user: 'chpark_11',
    password: 'password',
    dbAddress: '192.168.0.11',
    dbPort: 5432,
    dbUser: 'dbUser_11',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 13,
    siteName: 'siteName12',
    fabName: 'fabName_12',
    address: '10.1.31.12',
    port: 80,
    user: 'chpark_12',
    password: 'password',
    dbAddress: '192.168.0.12',
    dbPort: 5432,
    dbUser: 'dbUser_12',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 14,
    siteName: 'siteName13',
    fabName: 'fabName_13',
    address: '10.1.31.13',
    port: 80,
    user: 'chpark_13',
    password: 'password',
    dbAddress: '192.168.0.13',
    dbPort: 5432,
    dbUser: 'dbUser_13',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 15,
    siteName: 'siteName14',
    fabName: 'fabName_14',
    address: '10.1.31.14',
    port: 80,
    user: 'chpark_14',
    password: 'password',
    dbAddress: '192.168.0.14',
    dbPort: 5432,
    dbUser: 'dbUser_14',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 16,
    siteName: 'siteName15',
    fabName: 'fabName_15',
    address: '10.1.31.15',
    port: 80,
    user: 'chpark_15',
    password: 'password',
    dbAddress: '192.168.0.15',
    dbPort: 5432,
    dbUser: 'dbUser_15',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 17,
    siteName: 'siteName16',
    fabName: 'fabName_16',
    address: '10.1.31.16',
    port: 80,
    user: 'chpark_16',
    password: 'password',
    dbAddress: '192.168.0.16',
    dbPort: 5432,
    dbUser: 'dbUser_16',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 18,
    siteName: 'siteName17',
    fabName: 'fabName_17',
    address: '10.1.31.17',
    port: 80,
    user: 'chpark_17',
    password: 'password',
    dbAddress: '192.168.0.17',
    dbPort: 5432,
    dbUser: 'dbUser_17',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 19,
    siteName: 'siteName18',
    fabName: 'fabName_18',
    address: '10.1.31.18',
    port: 80,
    user: 'chpark_18',
    password: 'password',
    dbAddress: '192.168.0.18',
    dbPort: 5432,
    dbUser: 'dbUser_18',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 20,
    siteName: 'siteName19',
    fabName: 'fabName_19',
    address: '10.1.31.19',
    port: 80,
    user: 'chpark_19',
    password: 'password',
    dbAddress: '192.168.0.19',
    dbPort: 5432,
    dbUser: 'dbUser_19',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 21,
    siteName: 'siteName20',
    fabName: 'fabName_20',
    address: '10.1.31.20',
    port: 80,
    user: 'chpark_20',
    password: 'password',
    dbAddress: '192.168.0.20',
    dbPort: 5432,
    dbUser: 'dbUser_20',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 22,
    siteName: 'siteName21',
    fabName: 'fabName_21',
    address: '10.1.31.21',
    port: 80,
    user: 'chpark_21',
    password: 'password',
    dbAddress: '192.168.0.21',
    dbPort: 5432,
    dbUser: 'dbUser_21',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 23,
    siteName: 'siteName22',
    fabName: 'fabName_22',
    address: '10.1.31.22',
    port: 80,
    user: 'chpark_22',
    password: 'password',
    dbAddress: '192.168.0.22',
    dbPort: 5432,
    dbUser: 'dbUser_22',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 24,
    siteName: 'siteName23',
    fabName: 'fabName_23',
    address: '10.1.31.23',
    port: 80,
    user: 'chpark_23',
    password: 'password',
    dbAddress: '192.168.0.23',
    dbPort: 5432,
    dbUser: 'dbUser_23',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 25,
    siteName: 'siteName24',
    fabName: 'fabName_24',
    address: '10.1.31.24',
    port: 80,
    user: 'chpark_24',
    password: 'password',
    dbAddress: '192.168.0.24',
    dbPort: 5432,
    dbUser: 'dbUser_24',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 26,
    siteName: 'siteName25',
    fabName: 'fabName_25',
    address: '10.1.31.25',
    port: 80,
    user: 'chpark_25',
    password: 'password',
    dbAddress: '192.168.0.25',
    dbPort: 5432,
    dbUser: 'dbUser_25',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 27,
    siteName: 'siteName26',
    fabName: 'fabName_26',
    address: '10.1.31.26',
    port: 80,
    user: 'chpark_26',
    password: 'password',
    dbAddress: '192.168.0.26',
    dbPort: 5432,
    dbUser: 'dbUser_26',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 28,
    siteName: 'siteName27',
    fabName: 'fabName_27',
    address: '10.1.31.27',
    port: 80,
    user: 'chpark_27',
    password: 'password',
    dbAddress: '192.168.0.27',
    dbPort: 5432,
    dbUser: 'dbUser_27',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 29,
    siteName: 'siteName28',
    fabName: 'fabName_28',
    address: '10.1.31.28',
    port: 80,
    user: 'chpark_28',
    password: 'password',
    dbAddress: '192.168.0.28',
    dbPort: 5432,
    dbUser: 'dbUser_28',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
  {
    id: 30,
    siteName: 'siteName29',
    fabName: 'fabName_29',
    address: '10.1.31.29',
    port: 80,
    user: 'chpark_29',
    password: 'password',
    dbAddress: '192.168.0.29',
    dbPort: 5432,
    dbUser: 'dbUser_29',
    dbPassword: 'password',
    excuteMpas: ['MPA_1', 'MPA_2', 'MPA_3', 'MPA_4'],
  },
];

const dummyData = resDummy.map((item, index) => ({
  index: index,
  ...item,
  excuteMpasCount: item.excuteMpas.length,
}));
