import React, { useCallback } from 'react'
import { green, grey, red } from '@ant-design/colors'
import { css } from '@emotion/react'
import { Row, Space, Table } from 'antd'
import Icon from '../../../libs/utils/Icon'

type BuildStatus = 'success' | 'failure' | 'notbuild'

interface RemoteStatus {
  no: number
  siteName: string
  collectStatus: BuildStatus
  errorStatus: BuildStatus
  crasStatus: BuildStatus
  versionStatus: BuildStatus
  isRunning: boolean
}

const data: RemoteStatus[] = [
  {
    no: 1,
    siteName: 'GKC_BQ',
    collectStatus: 'success',
    errorStatus: 'success',
    crasStatus: 'success',
    versionStatus: 'success',
    isRunning: true,
  },
  {
    no: 2,
    siteName: 'BSOT_s1',
    collectStatus: 'failure',
    errorStatus: 'success',
    crasStatus: 'failure',
    versionStatus: 'success',
    isRunning: false,
  },
  {
    no: 3,
    siteName: 'BSOT_s2',
    collectStatus: 'success',
    errorStatus: 'failure',
    crasStatus: 'success',
    versionStatus: 'success',
    isRunning: true,
  },
]

export type StatusTableProps = {
  children?: React.ReactNode
}

export default function StatusTable({ children }: StatusTableProps) {
  const startAndStopRender = useCallback((value: boolean) => {
    if (value) {
      return <Icon name="play" />
    } else {
      return <Icon name="stop" />
    }
  }, [])

  return (
    <Table<RemoteStatus> dataSource={data}>
      <Table.Column<RemoteStatus> key="no" title="No" dataIndex="no" />
      <Table.Column<RemoteStatus>
        key="siteName"
        title="Site Name"
        dataIndex="siteName"
      />
      \
      <Table.Column<RemoteStatus>
        key="collectStatus"
        title="Collect/Convert/Insert"
        dataIndex="collectStatus"
        render={getBuildStatusIconText}
      />
      <Table.Column<RemoteStatus>
        key="errorStatus"
        title="Send Error Summary"
        dataIndex="errorStatus"
        render={getBuildStatusIconText}
      />
      <Table.Column<RemoteStatus>
        key="crasStatus"
        title="Create Cras Data"
        dataIndex="crasStatus"
        render={getBuildStatusIconText}
      />
      <Table.Column<RemoteStatus>
        key="versionStatus"
        title="Check Cras Version"
        dataIndex="versionStatus"
        render={getBuildStatusIconText}
      />
      <Table.Column<RemoteStatus>
        key="isRunning"
        title="Start/Stop"
        dataIndex="isRunning"
        render={startAndStopRender}
      />
      <Table.Column<RemoteStatus> key="no" title="Edit" />
      <Table.Column<RemoteStatus> key="no" title="Delete" />
    </Table>
  )
}

const style = css``

const getBuildStatusIconText = (value: string) => {
  switch (value) {
    case 'success':
      return (
        <Row justify="center" align="middle">
          <Icon
            name="circle"
            css={css`
              color: ${red[6]};
              width: 1rem;
              height: 1rem;
            `}
          />
        </Row>
      )
    case 'failure':
      return (
        <Space>
          <Icon
            name="circle"
            css={css`
              color: ${green[6]};
              width: 1rem;
              height: 1rem;
            `}
          />
          <span>value</span>
        </Space>
      )
    case 'notbuild':
      return (
        <Space>
          <Icon
            name="circle"
            css={css`
              color: ${grey[6]};
              width: 1rem;
              height: 1rem;
            `}
          />

          <span>value</span>
        </Space>
      )
    default:
      return null
  }
}
