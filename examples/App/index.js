// @flow
// @jsx glam

import glam from 'glam';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Customization, Home, NoMatch, ReactRouter } from '../pages';
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
  { label: 'React Router', value: '/react-router' },
  { label: 'Customization', value: '/customization' },
];

class App extends Component<*> {
  routeProps: ProviderProps;
  render() {
    const routeProps = (this.routeProps = this.props);
    return (
      <BrowserRouter>
        <Route>
          <AppContainer>
            <Route
              render={({ location }) => (
                <Nav>
                  {links.map(l => {
                    const selected = location.pathname === l.value;
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
                    path="/react-router/:currentView?"
                    component={ReactRouter}
                    {...routeProps}
                  />
                  <Route component={NoMatch} />
                </Switch>
              </PageContent>
            </AppContent>
          </AppContainer>
        </Route>
      </BrowserRouter>
    );
  }
}

export default withImages(App);
