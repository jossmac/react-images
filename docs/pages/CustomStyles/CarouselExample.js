// @flow
// @jsx glam
import glam from 'glam'
import React, { Component } from 'react'

import Carousel from '../../../src/components'
import type { ProviderProps } from '../../ImageProvider'
import { Code, FooterCaption, Heading } from '../components'
import { getAltText } from '../formatters'

export default class CarouselExample extends Component<ProviderProps> {
  render() {
    const { images, isLoading } = this.props

    return (
      <div>
        <Heading source="/CustomStyles/CarouselExample.js">Carousel Example</Heading>
        <p>
          In this example some components are extended to appear like a polaroid. Various elements react to <Code>interactionIsIdle</Code> by dimming, changing
          color or applying a CSS filter.
        </p>
        {!isLoading ? (
          <Carousel
            components={{ FooterCaption }}
            formatters={{ getAltText }}
            views={images}
            styles={{
              container: base => ({
                ...base,
                backgroundColor: '#fafafa',
                boxShadow: '0 1px 10px -1px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.04), 0 1px 0 rgba(0,0,0,0.04)',
                padding: 10,
              }),
              footer: (base, state) => ({
                ...base,
                color: 'black',
                minHeight: 42,
                paddingBottom: 0,

                '& a': {
                  color: state.interactionIsIdle ? 'black' : '#00d7ff',
                  transition: 'color 300ms',
                },
                '& strong': { textTransform: 'uppercase' },
              }),
              navigationItem: base => ({
                ...base,
                backgroundColor: 'transparent',

                ':hover': {
                  backgroundColor: '#00d7ff',
                },
                ':active': {
                  backgroundColor: '#00d7ff',
                  transform: 'translateY(2px)',
                },
              }),
              view: (base, state) => ({
                ...base,
                filter: state.interactionIsIdle ? 'grayscale(100%)' : null,
                paddingBottom: `${(10 / 16) * 100}%`,
                overflow: 'hidden',
                position: 'relative',
                transition: 'filter 300ms',

                '& > img': {
                  position: 'absolute',
                  left: 0,
                  top: 0,
                },
              }),
            }}
          />
        ) : null}
      </div>
    )
  }
}
