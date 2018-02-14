// @flow
// @jsx glam
import React, { type ElementRef, type Node } from 'react';
import glam from 'glam';
import { Div } from '../primitives';
import { type PropsWithStyles } from '../types';

type State = { isFullscreen: boolean };
type Props = State &
  PropsWithStyles & {
    children: Node,
    innerProps: { innerRef: ElementRef<*> },
  };

export const containerCSS = ({ isFullscreen }: State) => ({
  backgroundColor: isFullscreen ? 'black' : null,
  display: 'flex ',
  flexDirection: 'column',
  height: '100%',
});

const Container = (props: Props) => {
  const { children, getStyles, innerProps } = props;
  return (
    <Div css={getStyles('container', props)} {...innerProps}>
      {children}
    </Div>
  );
};

export default Container;
