import React from "react";
import { css } from "@emotion/react";

export type AppLayoutProps = {
  children?: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return <div css={style}>{children}</div>;
}

const style = css``;

export type HeaderProps = {
  children?: React.ReactNode;
};

export function Header({ children }: AppLayoutProps) {
  return <header css={headerstyle}>Header</header>;
}

const headerstyle = css``;

export type MainProps = {
  children?: React.ReactNode;
};

export function Main({ children }: MainProps) {
  return <main css={headerstyle}>{children}</main>;
}

const mainstyle = css``;

export type FooterProps = {
  children?: React.ReactNode;
};

export function Footer({ children }: FooterProps) {
  return <footer css={headerstyle}>Footer</footer>;
}

const footerstyle = css``;

export type ContentsProps = {
  children?: React.ReactNode;
};

export function Contents({ children }: ContentsProps) {
  return <main css={contentsStyle}>Contents</main>;
}

const contentsStyle = css``;

AppLayout.Hedaer = Header;
AppLayout.Main = Main;
AppLayout.Footer = Footer;
AppLayout.Contents = Contents;
