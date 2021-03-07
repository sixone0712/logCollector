import { css } from '@emotion/react'
import React from 'react'
import StatusTable from '../../components/organisms/StatusTable'
import AppLayout from '../../components/Templates/AppLayout'

export type LoginProps = {
  children?: React.ReactNode
}

export default function Login({ children }: LoginProps) {
  return (
    <AppLayout.Contents>
      <StatusTable />
    </AppLayout.Contents>
  )
}

const style = css``
