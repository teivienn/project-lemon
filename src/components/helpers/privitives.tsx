import styled, { css } from 'styled-components';
import {
  borders,
  color,
  flexbox,
  layout,
  space,
  BorderProps,
  ColorProps,
  LayoutProps,
  SpaceProps,
  FlexboxProps,
} from 'styled-system';

export type BoxProps = BorderProps &
  ColorProps &
  FlexboxProps &
  LayoutProps &
  SpaceProps & {
    center?: boolean;
    row?: boolean;
    marginHorizontal?: number;
    paddingHorizontal?: number;
  };

const boxStyles = css<BoxProps>`
  ${borders}
  ${color}
  ${flexbox}
  ${layout}
  ${space}
  ${(props) => props.center && `align-items: center; justify-content: center`}
`;

export const Box = styled.div<BoxProps & { center?: boolean }>`
  ${boxStyles};
  ${({ center }) => center && `align-items: center; justify-content: center`};
  ${({ row }) =>
    row &&
    css`
      flex-direction: row;
    `};
`;

export const Row = styled(Box)({
  flexDirection: 'row',
});
