// @flow
// @jsx glam

import glam from 'glam';
import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../theme';

const borderColor = 'hsl(0, 0%, 88%)';
const navWidth = 180;
const appWidth = 640;
const appGutter = 20;
const contentGutter = 30;
const pagePadding = 260;
const smallDevice = '@media (max-width: 769px)';
const largeDevice = '@media (min-width: 770px)';

export const AppContainer = (props: any) => (
  <div
    css={{
      boxSizing: 'border-box',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: appWidth + navWidth / 2,
      minHeight: '100vh',
      padding: `0 ${appGutter}px ${pagePadding}px`,

      [smallDevice]: {
        maxWidth: appWidth,
      },
    }}
    {...props}
  />
);
export const PageContent = (props: any) => (
  <div
    css={{
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 640,
      paddingBottom: contentGutter,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: contentGutter,

      [smallDevice]: {
        paddingTop: contentGutter * 2,
      },
    }}
    {...props}
  />
);
export const AppContent = (props: any) => (
  <div
    css={{
      flex: '1 1 auto',
      marginLeft: 'auto',
      marginRight: 'auto',

      [largeDevice]: {
        paddingLeft: navWidth + contentGutter,

        ':before': {
          borderRight: `1px solid ${borderColor}`,
          content: ' ',
          marginLeft: -(navWidth + contentGutter),
          height: '100%',
          position: 'fixed',
          width: navWidth,
        },
      },
    }}
    {...props}
  />
);
export const Nav = (props: any) => (
  <div
    css={{
      [smallDevice]: {
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        boxShadow: 'inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
        display: 'flex ',
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: -appGutter,
        marginRight: -appGutter,
        overflowX: 'auto',
        position: 'fixed',
        top: 0,
        width: '100%',
        WebkitOverflowScrolling: 'touch',
      },

      [largeDevice]: {
        display: 'block',
        float: 'left',
        paddingTop: contentGutter,
        position: 'fixed',
        width: navWidth,
        zIndex: 1,
      },
    }}
    {...props}
  />
);
export const NavItem = ({ selected, ...props }: { selected: boolean }) => (
  <Link
    css={{
      color: selected ? 'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 40%)',
      display: 'inline-block',
      padding: `15px ${appGutter}px`,
      position: 'relative',
      textDecoration: 'none',
      whiteSpace: 'nowrap',

      ':hover, :active': {
        color: selected ? 'hsl(0, 0%, 10%)' : colors.primary,
        textDecoration: 'none',
      },

      [smallDevice]: {
        boxShadow: selected ? 'inset 0 -1px 0 black' : null,
      },

      [largeDevice]: {
        backgroundColor: selected ? 'white' : 'transparent',
        borderColor: selected ? borderColor : 'transparent',
        borderStyle: 'solid',
        borderWidth: '1px 0',
        display: 'block',
        padding: '10px 20px 10px 0',
        right: -1,

        ':before': {
          content: ' ',
          // background: 'linear-gradient(90deg, fade(#e9e9e9, 0%) 94%, #e9e9e9)',
        },
      },
    }}
    {...props}
  />
);
