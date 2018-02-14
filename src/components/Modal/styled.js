// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';
import { Div } from '../../primitives';
import { type PropsWithStyles } from '../../types';

// ==============================
// Blanket
// ==============================

type BlanketState = { isFullscreen: boolean };
type BlanketProps = BlanketState &
  PropsWithStyles & {
    innerProps: Object, // TODO
  };

export const blanketCSS = ({ isFullscreen }: BlanketState) => ({
  backgroundColor: isFullscreen ? 'black' : 'rgba(0, 0, 0, 0.8)',
  bottom: 0,
  left: 0,
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: 1,
});

export const Blanket = (props: BlanketProps) => {
  const { getStyles, innerProps } = props;
  return <Div css={getStyles('blanket', props)} {...innerProps} />;
};

// ==============================
// Positioner
// ==============================

type PositionerProps = PropsWithStyles & {
  children: Node,
  innerProps: Object, // TODO
};

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

export const Positioner = (props: PositionerProps) => {
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

type DialogProps = PropsWithStyles & {
  children: Node,
  innerProps: Object, // TODO
};

export const dialogCSS = () => ({});

export const Dialog = (props: DialogProps) => {
  const { children, getStyles, innerProps } = props;
  return (
    <Div css={getStyles('dialog', props)} {...innerProps}>
      {children}
    </Div>
  );
};
