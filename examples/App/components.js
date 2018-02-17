// @flow
// @jsx glam

import glam from 'glam';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { colors } from '../theme';

const navWidth = 180;
const appWidth = 840;
const appGutter = 15;
const contentGutter = 20;
const pagePadding = 120;
const smallDevice = '@media (max-width: 769px)';
const largeDevice = '@media (min-width: 770px)';

export const AppContainer = (props: any) => (
  <div
    css={{
      boxSizing: 'border-box',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: appWidth,
      minHeight: '100vh',
      padding: `0 ${appGutter}px ${pagePadding}px`,
    }}
    {...props}
  />
);
export const PageContent = (props: any) => (
  <div
    css={{
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingBottom: contentGutter,
      paddingTop: contentGutter,

      [smallDevice]: {
        paddingTop: 50,
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
        paddingLeft: navWidth,
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
      border: 0,
      color: selected ? colors.N100 : colors.N60,
      display: 'inline-block',
      fontWeight: selected ? 500 : null,
      padding: appGutter,
      position: 'relative',
      textDecoration: 'none',
      whiteSpace: 'nowrap',

      ':hover, :active': {
        color: colors.N80,
        textDecoration: 'none',
      },

      [smallDevice]: {
        boxShadow: selected ? 'inset 0 -1px 0 black' : null,
        padding: `10px ${appGutter}px`,
      },

      [largeDevice]: {
        backgroundColor: selected ? 'white' : 'transparent',
        // borderColor: selected ? borderColor : 'transparent',
        // borderStyle: 'solid',
        // borderWidth: '1px 0',
        display: 'block',
        padding: '10px 20px 10px 0',
        // right: -1,

        ':before': {
          content: ' ',
          // background: 'linear-gradient(90deg, fade(#e9e9e9, 0%) 94%, #e9e9e9)',
        },
      },
    }}
    {...props}
  />
);

// Return scroll to top on route change
class ScrollToTop extends Component<*> {
  componentDidUpdate(prevProps) {
    const { history, location } = this.props;

    // do not influence scroll on browser back/forward
    if (history.action === 'POP') return;

    // no scroll when extending the current path
    const pathArr = location.pathname.split('/');
    if (!prevProps.location.pathname.includes(pathArr[1])) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export const ScrollRestoration = withRouter(ScrollToTop);
