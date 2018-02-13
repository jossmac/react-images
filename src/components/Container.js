// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';
import { Div } from '../primitives';

type ContainerState = { isFullscreen: boolean };
type ContainerProps = ContainerState & {
  innerProps: { innerRef: ElementRef<*> },
};

export const containerCSS = ({ isFullscreen }: ContainerState) => ({
  backgroundColor: isFullscreen ? 'black' : null,
  display: 'flex ',
  flexDirection: 'column',
  height: '100%',
});

const Container = (props: ContainerProps) => {
  const { children, getStyles, innerProps } = props;
  return (
    <Div css={getStyles('container', props)} {...innerProps}>
      {children}
    </Div>
  );
};

export default Container;
