// @flow
// @jsx glam
import React, { type Node } from 'react';
import glam from 'glam';

import { Button, Nav } from '../primitives';
import { type PropsWithStyles } from '../types';
import { className } from '../utils';
import { ChevronLeft, ChevronRight } from './svg';

// ==============================
// Navigation
// ==============================

type NavState = { mouseIsIdle: boolean };
type NavProps = NavState &
  PropsWithStyles & {
    children: Node,
    isFullscreen: boolean,
    isModal: boolean,
  };

export const navigationCSS = ({ mouseIsIdle }: NavState) => ({
  display: 'flex ',
  alignItems: 'center',
  justifyContent: 'space-between',
  opacity: mouseIsIdle ? 0 : 1,
  transition: 'opacity 300ms',
});

export const Navigation = (props: NavProps) => {
  const { children, getStyles, isFullscreen, isModal } = props;
  return (
    <Nav
      css={getStyles('navigation', props)}
      className={className('navigation', { isFullscreen, isModal })}
    >
      {children}
    </Nav>
  );
};

// ==============================
// Nav Item
// ==============================

const BUTTON_SIZE = 50;

const icon = {
  left: ChevronLeft,
  right: ChevronRight,
};

type ItemState = { align: 'left' | 'right' };
type ItemProps = ItemState &
  PropsWithStyles & {
    innerProps: {
      onClick: any => void,
      title: string,
    },
  };

export const navigationItemCSS = ({ align }: ItemState) => ({
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.2)',
  border: 0,
  borderRadius: '50%',
  color: 'white',
  cursor: 'pointer',
  display: 'flex ',
  fontSize: 'inherit',
  height: BUTTON_SIZE,
  justifyContent: 'center',
  marginTop: -(BUTTON_SIZE / 2),
  outline: 0,
  position: 'absolute',
  top: '50%',
  transition: 'background-color 200ms',
  width: BUTTON_SIZE,
  [align]: 20, // 'left' | 'right'

  '&:hover': {
    background: 'rgba(255, 255, 255, 0.3)',
  },
  '&:active': {
    background: 'rgba(255, 255, 255, 0.2)',
  },
});

export const NavigationItem = (props: ItemProps) => {
  const { align, getStyles, innerProps } = props;
  const Icon = icon[align];

  return (
    <Button css={getStyles('navigationItem', props)} {...innerProps}>
      <Icon size={48} />
    </Button>
  );
};
