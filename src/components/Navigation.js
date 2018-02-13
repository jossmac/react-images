// @flow
// @jsx glam
import React, { type Node } from 'react';
import glam from 'glam';
import { Button, Nav } from '../primitives';
import { ChevronLeft, ChevronRight } from './svg';

// ==============================
// Navigation
// ==============================

type NavState = { mouseIsIdle: boolean };
type NavProps = NavState & {
  children: Node,
};

export const navigationCSS = ({ mouseIsIdle }: NavState) => ({
  display: 'flex ',
  alignItems: 'center',
  justifyContent: 'space-between',
  opacity: mouseIsIdle ? 0 : 1,
  transition: 'opacity 300ms',
});

export const Navigation = (props: NavProps) => {
  const { children, getStyles } = props;
  return <Nav css={getStyles('navigation', props)}>{children}</Nav>;
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
type ItemProps = ItemState & {
  innerProps: {
    onClick: any => void,
    title: string,
  },
};

export const navigationItemCSS = ({ align }: ItemState) => ({
  [align]: 16,
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
