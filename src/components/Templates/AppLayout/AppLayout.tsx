import React from 'react';
import { css } from '@emotion/react';
import { Layout as AntdLayout } from 'antd';

const { Header: AntdHeader, Content: AntdContent, Footer: AntdFooter } = AntdLayout;

export type AppLayoutProps = {
  children?: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return <AntdLayout css={style}>{children}</AntdLayout>;
}

const style = css``;

export type HeaderProps = {
  children?: React.ReactNode;
};

export function Header({ children }: AppLayoutProps) {
  return <AntdHeader css={headerstyle}>{children}</AntdHeader>;
}

const headerstyle = css`
  box-shadow: 0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  height: 4rem;
  width: 100%;
  position: fixed;
  z-index: 100;
`;

export type MainProps = {
  children?: React.ReactNode;
};

export function Main({ children }: MainProps) {
  return <AntdContent css={mainstyle}>{children}</AntdContent>;
}

const mainstyle = css`
  padding: 4rem 3.125rem 0 3.125rem;
`;

export type FooterProps = {
  children?: React.ReactNode;
};

export function Footer({ children }: FooterProps) {
  return <AntdFooter css={footerstyle}>{children}</AntdFooter>;
}

const footerstyle = css`
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export type ContentsProps = {
  children?: React.ReactNode;
};

export function Contents({ children }: ContentsProps) {
  return <AntdContent css={contentsStyle}>{children}</AntdContent>;
}

const contentsStyle = css``;

AppLayout.Hedaer = Header;
AppLayout.Main = Main;
AppLayout.Footer = Footer;
AppLayout.Contents = Contents;
