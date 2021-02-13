// @flow
// @jsx glam
import glam from 'glam'
import React, { Component } from 'react'

import Carousel from '../../../src/components'
import type { ProviderProps } from '../../ImageProvider'
import type { RouterProps } from '../../../src/types'
import { Code, Heading } from '../components'

type Props = ProviderProps & RouterProps

export default class RouterGallery extends Component<Props> {
  handleViewChange = (currentIndex: number) => {
    const { history } = this.props

    // do not influence history on browser back/forward
    if (history.action === 'POP') return

    history.push(`/patterns/${currentIndex.toString()}`)
  }
  getCurrentView() {
    const { match } = this.props
    return match ? parseInt(match.params.currentIndex, 10) || 0 : 0
  }
  render() {
    const { images, isLoading } = this.props

    return (
      <div>
        <Heading source="/Patterns/RouterGallery.js">Carousel with Routing</Heading>
        <p>
          In this example we sync the <Code>currentIndex</Code> with the URL using react-router's <Code>history.push</Code> method. Check out the source to see
          this technique in detail.
        </p>
        <p>
          Try navigating with the Carousel's buttons, then with the browser's back and forward buttons. The current view is also maintained on page refresh via
          react-router's <Code>match.params</Code>.
        </p>
        {!isLoading ? (
          <Carousel
            currentIndex={this.getCurrentView()}
            trackProps={{
              onViewChange: this.handleViewChange,
            }}
            views={images}
            components={{ Header: null }}
          />
        ) : null}
      </div>
    )
  }
}
