import React, { FunctionComponent, SVGProps } from 'react';
import * as svg from './svg';
import { css, SerializedStyles } from '@emotion/react';
import Icon from '@ant-design/icons';

export type IconType = keyof typeof svg;
export type IconProps = {
  name: IconType;
  className?: string;
  style?: React.CSSProperties;
  css?: SerializedStyles;
};

function CustomIcon({ name, className, style, css }: IconProps) {
  return (
    <Icon
      component={svg[name] as FunctionComponent<SVGProps<SVGSVGElement>>}
      className={className}
      style={style}
      css={css}
    />
  );
}

export default CustomIcon;
