// @flow
// @jsx glam
import glam from 'glam'
import React, { Component } from 'react'

import Carousel, { Modal, ModalGateway } from '../../../src/components'
import type { ProviderProps } from '../../ImageProvider'
import { Code, FooterCaption, Heading } from '../components'
import { getAltText } from '../formatters'

type State = { lightboxIsOpen: boolean }

export default class ModalExample extends Component<ProviderProps, State> {
  state = { lightboxIsOpen: false }
  toggleLightbox = () => {
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen,
    }))
  }
  render() {
    const { images, isLoading } = this.props
    const { lightboxIsOpen } = this.state

    return (
      <div>
        <Heading source="/CustomStyles/ModalExample.js">Modal Example</Heading>
        <p>
          In this example the <Code>blanket</Code>, <Code>footer</Code>, and <Code>header</Code> have been <em>inverted</em> from the default style of white on
          black. The dialog has been given a <Code>maxWidth</Code> centering the entire element.
        </p>

        {!isLoading ? (
          <button type="button" onClick={this.toggleLightbox}>
            Open Modal
          </button>
        ) : null}

        <ModalGateway>
          {!isLoading && lightboxIsOpen ? (
            <Modal
              allowFullscreen={false}
              onClose={this.toggleLightbox}
              styles={{
                blanket: base => ({
                  ...base,
                  backgroundColor: 'rgba(255,255,255,0.85)',
                }),
                dialog: base => ({
                  ...base,
                  maxWidth: 640,
                }),
              }}
            >
              <Carousel
                components={{ FooterCaption }}
                formatters={{ getAltText }}
                views={images}
                styles={{
                  footer: base => ({
                    ...base,
                    background: 'none !important',
                    color: '#666',
                    padding: 0,
                    paddingTop: 20,
                    position: 'static',

                    '& a': {
                      color: 'black',
                    },
                  }),
                  header: base => ({
                    ...base,
                    background: 'none !important',
                    padding: 0,
                    paddingBottom: 10,
                    position: 'static',
                  }),
                  headerClose: base => ({
                    ...base,
                    color: '#666',

                    ':hover': { color: '#DE350B' },
                  }),
                  view: base => ({
                    ...base,
                    maxHeight: 480,
                    overflow: 'hidden',
                  }),
                }}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    )
  }
}
