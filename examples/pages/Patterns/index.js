// @flow
// @jsx glam
import glam from 'glam';
import React, { Component } from 'react';

import { Code } from '../components';
import RouterGallery from './RouterGallery';

export default class Patterns extends Component<*> {
  render() {
    return (
      <div>
        <h1>Patterns</h1>
        <p>
          A collection of common patterns you may like to implement with
          React-Images.
        </p>
        <RouterGallery {...this.props} />
      </div>
    );
  }
}
