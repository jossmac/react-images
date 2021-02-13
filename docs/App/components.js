// @flow
// @jsx glam

import glam from 'glam'
import React, { Component, type Node } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { colors } from '../theme'
import { smallDevice, largeDevice } from '../utils'

const navWidth = 180
const appWidth = 840
const appGutter = 15
const contentGutter = 20
const pagePadding = 120

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
)
export const PageContent = (props: any) => (
  <div
    css={{
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingBottom: contentGutter,
      paddingTop: contentGutter,

      [smallDevice]: {
        paddingTop: 70,
      },
    }}
    {...props}
  />
)
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
)
export const Nav = ({ children }: { children: Node }) => (
  <nav
    css={{
      position: 'fixed',
      zIndex: 1,

      [smallDevice]: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        boxShadow: 'inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
        display: 'flex ',
        fontSize: 13,
        marginLeft: -appGutter,
        marginRight: -appGutter,
        overflowX: 'auto',
        top: 0,
        width: '100%',
        WebkitOverflowScrolling: 'touch',
      },

      [largeDevice]: {
        display: 'block',
        float: 'left',
        paddingTop: contentGutter,
        width: navWidth,
      },
    }}
  >
    {children}
    <Footer />
  </nav>
)

type ItemProps = {
  children: Node,
  icon: string,
  isSelected: boolean,
  to: string,
}
export const NavItem = ({ children, icon, isSelected, to }: ItemProps) => {
  const attrs = isSelected ? { 'aria-current': 'page' } : {}
  return (
    <Link
      {...attrs}
      to={to}
      css={{
        alignItems: 'center',
        border: 0,
        color: isSelected ? colors.N100 : colors.N60,
        fontWeight: isSelected ? 500 : null,
        position: 'relative',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',

        ':hover, :active': {
          color: colors.N80,
          textDecoration: 'none',
        },

        [smallDevice]: {
          boxShadow: isSelected ? 'inset 0 -2px 0 black' : null,
          display: 'inline-flex ',
          padding: `8px ${appGutter}px`,
        },

        [largeDevice]: {
          backgroundColor: isSelected ? 'white' : 'transparent',
          display: 'flex ',
          padding: '8px 20px 8px 0',
        },
      }}
    >
      <span css={{ fontSize: '1.33em', marginRight: '0.5em' }} role="presentation">
        {icon}
      </span>
      {children}
    </Link>
  )
}

const Footer = () => {
  const size = window.innerWidth > 769 ? 'large' : null

  return (
    <div
      css={{
        [smallDevice]: {
          paddingLeft: appGutter,
          paddingRight: appGutter,
        },
        [largeDevice]: {
          position: 'fixed',
          bottom: 30,
        },
      }}
    >
      <a
        className="github-button"
        href="https://github.com/jossmac/react-images"
        data-size={size}
        data-show-count="true"
        aria-label="Star jossmac/react-images on GitHub"
      >
        Star
      </a>
      <p
        css={{
          color: colors.N40,
          fontSize: '0.85em',
          marginBottom: 0,
          [smallDevice]: { display: 'none' },
        }}
      >
        with ❤️ by{' '}
        <a href="https://twitter.com/jossmackison" target="_blank">
          jossmac
        </a>
      </p>
    </div>
  )
}

// Return scroll to top on route change
class ScrollToTop extends Component<*> {
  componentDidUpdate(prevProps) {
    const { history, location } = this.props

    // do not influence scroll on browser back/forward
    if (history.action === 'POP') return

    // no scroll when extending the current path
    const pathArr = location.pathname.split('/')
    if (!prevProps.location.pathname.includes(pathArr[1])) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export const ScrollRestoration = withRouter(ScrollToTop)
