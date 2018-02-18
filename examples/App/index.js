// @flow
// @jsx glam

import glam from 'glam';
import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import {
  CustomComponents,
  CustomStyles,
  Home,
  NoMatch,
  Patterns,
} from '../pages';
import ImageRoute from '../ImageRoute';
import withImages, { type ProviderProps } from '../ImageProvider';
import {
  AppContainer,
  PageContent,
  AppContent,
  Nav,
  NavItem,
  ScrollRestoration,
} from './components';

const links = [
  { icon: '🏠', label: 'Home', path: '/' },
  { icon: '🏗', label: 'Components', path: '/components' },
  { icon: '🎨', label: 'Styles', path: '/styles' },
  { icon: '🎓', label: 'Patterns', path: '/patterns' },
];

class App extends Component<*> {
  routeProps: ProviderProps;
  render() {
    const routeProps = (this.routeProps = this.props);
    return (
      <HashRouter>
        <ScrollRestoration>
          <AppContainer>
            <Route
              render={({ location }) => (
                <Nav>
                  {links.map(l => {
                    const isSelected =
                      l.path.length > 1
                        ? location.pathname.includes(l.path)
                        : location.pathname === l.path;
                    return (
                      <NavItem
                        icon={l.icon}
                        key={l.path}
                        isSelected={isSelected}
                        to={l.path}
                      >
                        {l.label}
                      </NavItem>
                    );
                  })}
                </Nav>
              )}
            />
            <AppContent>
              <PageContent>
                <Switch>
                  <ImageRoute exact path="/" component={Home} {...routeProps} />
                  <ImageRoute
                    exact
                    path="/styles"
                    component={CustomStyles}
                    {...routeProps}
                  />
                  <ImageRoute
                    path="/patterns/:currentView?"
                    component={Patterns}
                    {...routeProps}
                  />
                  <Route
                    exact
                    path="/components"
                    component={CustomComponents}
                  />
                  <Route component={NoMatch} />
                </Switch>
              </PageContent>
            </AppContent>
          </AppContainer>
        </ScrollRestoration>
      </HashRouter>
    );
  }
}

export default withImages(App);
