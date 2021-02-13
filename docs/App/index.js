// @flow
// @jsx glam

import glam from 'glam'
import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Accessibility, CustomComponents, CustomStyles, Home, NoMatch, Patterns, Thanks } from '../pages'
import ImageRoute from '../ImageRoute'
import withImages, { type ProviderProps } from '../ImageProvider'
import { AppContainer, PageContent, AppContent, Nav, NavItem, ScrollRestoration } from './components'

const links = [
  { icon: '🌄', label: 'Intro', path: '/' },
  { icon: '🏗', label: 'Components', path: '/components' },
  { icon: '🎨', label: 'Styles', path: '/styles' },
  { icon: '💖', label: 'Accessibility', path: '/accessibility' },
  { icon: '🤖', label: 'Patterns', path: '/patterns' },
  { icon: '🎉', label: 'Thanks', path: '/thanks' },
]

class App extends Component<*> {
  routeProps: ProviderProps
  render() {
    const routeProps = (this.routeProps = this.props)
    return (
      <HashRouter>
        <ScrollRestoration>
          <AppContainer>
            <Route
              render={({ location }) => (
                <Nav>
                  {links.map(l => {
                    const isSelected = l.path.length > 1 ? location.pathname.includes(l.path) : location.pathname === l.path
                    return (
                      <NavItem icon={l.icon} key={l.path} isSelected={isSelected} to={l.path}>
                        {l.label}
                      </NavItem>
                    )
                  })}
                </Nav>
              )}
            />
            <AppContent>
              <Helmet>
                <title>React Images</title>
                <meta name="description" content="A mobile-friendly, highly customizable, carousel component for displaying media in ReactJS" />
              </Helmet>
              <PageContent>
                <Switch>
                  <ImageRoute exact path="/" component={Home} {...routeProps} />
                  <ImageRoute exact path="/styles" component={CustomStyles} {...routeProps} />
                  <ImageRoute exact path="/components" component={CustomComponents} {...routeProps} />
                  <ImageRoute exact path="/accessibility" component={Accessibility} {...routeProps} />
                  <ImageRoute path="/patterns/:currentIndex?" component={Patterns} {...routeProps} />
                  <Route component={Thanks} />
                  <Route component={NoMatch} />
                </Switch>
              </PageContent>
            </AppContent>
          </AppContainer>
        </ScrollRestoration>
      </HashRouter>
    )
  }
}

export default withImages(App)
