// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';
import { Div } from '../../primitives';

// ==============================
// Blanket
// ==============================

type Props = { isFullscreen: boolean };

export const blanketCSS = ({ isFullscreen }: Props) => ({
  backgroundColor: isFullscreen ? 'black' : 'rgba(0, 0, 0, 0.8)',
  bottom: 0,
  left: 0,
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: 1,
});

export const Blanket = (props: Props) => {
  const { getStyles, innerProps } = props;
  return <Div css={getStyles('blanket', props)} {...innerProps} />;
};

// ==============================
// Positioner
// ==============================

export const positionerCSS = () => ({
  alignItems: 'center',
  bottom: 0,
  color: 'white',
  display: 'flex ',
  justifyContent: 'center',
  left: 0,
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: 1,
});

export const Positioner = (props: Props) => {
  const { children, getStyles, innerProps } = props;
  return (
    <Div css={getStyles('positioner', props)} {...innerProps}>
      {children}
    </Div>
  );
};

// ==============================
// Dialog
// ==============================

export const dialogCSS = () => ({});

export const Dialog = (props: Props) => {
  const { children, getStyles, innerProps } = props;
  return (
    <Div css={getStyles('dialog', props)} {...innerProps}>
      {children}
    </Div>
  );
};
