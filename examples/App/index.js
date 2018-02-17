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
  { label: '🏠 Home', value: '/' },
  { label: '🏗 Components', value: '/components' },
  { label: '🎨 Styles', value: '/styles' },
  { label: '🎓 Patterns', value: '/patterns' },
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
                    const selected =
                      l.value.length > 1
                        ? location.pathname.includes(l.value)
                        : location.pathname === l.value;
                    return (
                      <NavItem key={l.value} selected={selected} to={l.value}>
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
