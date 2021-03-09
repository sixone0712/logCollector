import React from 'react';
import * as svg from './svg';
import { css, SerializedStyles } from '@emotion/react';

export type IconType = keyof typeof svg;
export type IconProps = {
  name: IconType;
  className?: string;
  style?: React.CSSProperties;
  css?: SerializedStyles;
};

function Icon({ name, className, style, css }: IconProps) {
  return React.createElement(svg[name], {
    className,
    style,
    css,
  });
}

export default Icon;
