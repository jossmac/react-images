// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';
import { Button, Nav } from './primitives';
import { ChevronLeft, ChevronRight } from './svg';

const BUTTON_SIZE = 50;

const icon = {
  left: ChevronLeft,
  right: ChevronRight,
};

type NavProps = { mouseIsIdle: boolean };
export const Navigation = ({ children, mouseIsIdle }: NavProps) => (
  <Nav
    css={{
      display: 'flex ',
      alignItems: 'center',
      justifyContent: 'space-between',
      opacity: mouseIsIdle ? 0 : 1,
      transition: 'opacity 300ms',
    }}
  >
    {children}
  </Nav>
);

type ItemProps = {
  align: 'left' | 'right',
  innerProps: {
    onClick: any => void,
    title: string,
  },
};
export const NavigationItem = ({ align, innerProps }: ItemProps) => {
  const Icon = icon[align];

  return (
    <Button
      css={{
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
      }}
      {...innerProps}
    >
      <Icon size={48} />
    </Button>
  );
};
