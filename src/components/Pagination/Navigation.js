// @flow
// @jsx glam
import React, { type Node } from 'react';
import glam from 'glam';

import { Button, Nav } from '../../primitives';
import { type PropsWithStyles } from '../../types';
import { className, isTouch } from '../../utils';
import { ChevronLeft, ChevronRight } from '../svg';

// ==============================
// PageNav
// ==============================

type NavState = { interactionIsIdle: boolean };
type NavProps = NavState &
  PropsWithStyles & {
    children: Node,
    isFullscreen: boolean,
    isModal: boolean,
  };

export const pageNavCSS = ({ interactionIsIdle }: NavState) => ({
  display: 'flex ',
  alignItems: 'center',
  justifyContent: 'space-between',
  opacity: interactionIsIdle ? 0 : 1,
  transition: 'opacity 300ms',
});

export const PageNav = (props: NavProps) => {
  const { children, getStyles, isFullscreen, isModal } = props;
  return (
    <Nav
      css={getStyles('pageNav', props)}
      className={className('page-nav', { isFullscreen, isModal })}
    >
      {children}
    </Nav>
  );
};

// ==============================
// Nav Item
// ==============================

const BUTTON_SIZE = 30;

type ItemState = { align: 'left' | 'right' };
type ItemProps = ItemState &
  PropsWithStyles & {
    children: Node,
    innerProps: {
      onClick: any => void,
      title: string,
    },
  };

export const pageNavItemCSS = ({ align }: ItemState) => ({
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

export const pageNavPrevCSS = pageNavItemCSS;
export const PageNavPrev = (props: ItemProps) => {
  const { children = <ChevronLeft size={32} />, getStyles, innerProps } = props;

  return (
    <Button
      css={getStyles('pageNavPrev', props)}
      className={className('page-nav__button page-nav__button--prev', {
        isFullscreen,
        isModal,
      })}
      {...innerProps}
    >
      {children}
    </Button>
  );
};

export const pageNavNextCSS = pageNavItemCSS;
export const PageNavNext = (props: ItemProps) => {
  const {
    children = <ChevronRight size={32} />,
    getStyles,
    innerProps,
  } = props;

  return (
    <Button
      css={getStyles('pageNavNext', props)}
      className={className('page-nav__button page-nav__button--next', {
        isFullscreen,
        isModal,
      })}
      {...innerProps}
    >
      {children}
    </Button>
  );
};
