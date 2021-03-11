import { css } from '@emotion/react';
import React from 'react';
import AppLayout from '../../components/Templates/AppLayout';

export type LoginProps = {
  children?: React.ReactNode;
};

export default function Login({ children }: LoginProps) {
  return <AppLayout.Contents></AppLayout.Contents>;
}

const style = css``;
