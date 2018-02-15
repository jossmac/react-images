// @flow
// @jsx glam

import glam from 'glam';
import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Customization, Home, NoMatch, RouterGallery } from '../pages';
import ImageRoute from '../ImageRoute';
import withImages, { type ProviderProps } from '../ImageProvider';
import {
  AppContainer,
  PageContent,
  AppContent,
  Nav,
  NavItem,
} from './components';

const links = [
  { label: 'Home', value: '/' },
  { label: 'Router Gallery', value: '/router-gallery' },
  { label: 'Customization', value: '/customization' },
];

class App extends Component<*> {
  routeProps: ProviderProps;
  render() {
    const routeProps = (this.routeProps = this.props);
    return (
      <HashRouter>
        <Route>
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
                  <Route
                    exact
                    path="/customization"
                    component={Customization}
                  />
                  <ImageRoute
                    path="/router-gallery/:currentView?"
                    component={RouterGallery}
                    {...routeProps}
                  />
                  <Route component={NoMatch} />
                </Switch>
              </PageContent>
            </AppContent>
          </AppContainer>
        </Route>
      </HashRouter>
    );
  }
}

export default withImages(App);
