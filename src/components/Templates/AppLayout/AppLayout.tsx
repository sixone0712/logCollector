import React from 'react';
import { css } from '@emotion/react';
import { Layout as AntdLayout } from 'antd';

const {
  Header: AntdHeader,
  Content: AntdContent,
  Footer: AntdFooter,
} = AntdLayout;

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

const headerstyle = css``;

export type MainProps = {
  children?: React.ReactNode;
};

export function Main({ children }: MainProps) {
  return <AntdContent css={headerstyle}>{children}</AntdContent>;
}

const mainstyle = css``;

export type FooterProps = {
  children?: React.ReactNode;
};

export function Footer({ children }: FooterProps) {
  return <AntdFooter css={headerstyle}>Footer</AntdFooter>;
}

const footerstyle = css``;

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
