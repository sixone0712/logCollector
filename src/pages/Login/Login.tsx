import { css } from '@emotion/react'
import React from 'react'
import StatusTable from '../../components/organisms/StatusTable'

export type LoginProps = {
  children?: React.ReactNode
}

export default function Login({ children }: LoginProps) {
  return (
    <div css={style}>
      <StatusTable />
    </div>
  )
}

const style = css``
