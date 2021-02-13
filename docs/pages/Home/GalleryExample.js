// @flow
// @jsx glam
import glam from 'glam'
import React, { Component, Fragment } from 'react'

import { type ProviderProps } from '../../ImageProvider'
import Carousel, { Modal, ModalGateway } from '../../../src/components'
import { FooterCaption } from '../components'
import { getAltText } from '../formatters'

type State = {
  selectedIndex?: number,
  lightboxIsOpen: boolean,
}

export default class Home extends Component<ProviderProps, State> {
  state = {
    selectedIndex: 0,
    lightboxIsOpen: false,
  }
  toggleLightbox = (selectedIndex: number) => {
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen,
      selectedIndex,
    }))
  }
  render() {
    const { images, isLoading } = this.props
    const { selectedIndex, lightboxIsOpen } = this.state
    return (
      <Fragment>
        {!isLoading ? (
          <Gallery>
            {images.map(({ caption, source }, j) => (
              <Image onClick={() => this.toggleLightbox(j)} key={source.thumbnail}>
                <img
                  alt={caption}
                  src={source.thumbnail}
                  css={{
                    cursor: 'pointer',
                    position: 'absolute',
                    maxWidth: '100%',
                  }}
                />
              </Image>
            ))}
          </Gallery>
        ) : null}

        <ModalGateway>
          {lightboxIsOpen && !isLoading ? (
            <Modal onClose={this.toggleLightbox}>
              <Carousel components={{ FooterCaption }} currentIndex={selectedIndex} formatters={{ getAltText }} views={images} />
            </Modal>
          ) : null}
        </ModalGateway>
      </Fragment>
    )
  }
}

const gutter = 2

const Gallery = (props: any) => (
  <div
    css={{
      overflow: 'hidden',
      marginLeft: -gutter,
      marginRight: -gutter,
    }}
    {...props}
  />
)

const Image = (props: any) => (
  <div
    css={{
      backgroundColor: '#eee',
      boxSizing: 'border-box',
      float: 'left',
      margin: gutter,
      overflow: 'hidden',
      paddingBottom: '16%',
      position: 'relative',
      width: `calc(25% - ${gutter * 2}px)`,

      ':hover': {
        opacity: 0.9,
      },
    }}
    {...props}
  />
)
