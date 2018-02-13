// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';
import { Div } from '../primitives';

type BlanketType = { isFullscreen: boolean };

export const Blanket = ({ isFullscreen, ...props }: BlanketType) => (
  <Div
    css={{
      backgroundColor: isFullscreen ? 'black' : 'rgba(0, 0, 0, 0.8)',
      bottom: 0,
      left: 0,
      position: 'fixed',
      right: 0,
      top: 0,
      zIndex: 1,
    }}
    {...props}
  />
);
export const Positioner = ({
  isFullscreen,
  ...props
}: {
  isFullscreen: boolean,
}) => (
  <Div
    css={{
      alignItems: 'center',
      bottom: 0,
      color: 'white',
      display: 'flex ',
      justifyContent: 'center',
      left: 0,
      // padding: isFullscreen ? 0 : "10px 20px",
      position: 'fixed',
      right: 0,
      top: 0,
      zIndex: 1,
    }}
    {...props}
  />
);
export const Dialog = ({
  isFullscreen,
  maxWidth,
  ...props
}: {
  isFullscreen: boolean,
  maxWidth: number,
}) => (
  <Div
    css={
      {
        // maxWidth: isFullscreen ? 'none' : maxWidth,
      }
    }
    {...props}
  />
);
