// @flow
// @jsx glam
import glam from 'glam'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import { Title } from '../components'
import RouterGallery from './RouterGallery'

export default class Patterns extends Component<*> {
  render() {
    return (
      <div>
        <Helmet>
          <title>Patterns - React Images</title>
          <meta
            name="description"
            content="A collection of common patterns you may like to implement with
            React-Images."
          />
        </Helmet>
        <Title>Patterns</Title>
        <p>A collection of common patterns you may like to implement with React-Images.</p>
        <RouterGallery {...this.props} />
      </div>
    )
  }
}
