// @flow
// @jsx glam
import glam from 'glam';
import React, { Component } from 'react';

import Carousel, { Modal, ModalGateway } from '../../../src/components';
import type { ProviderProps } from '../../ImageProvider';
import { Code, Heading } from '../components';

type State = { lightboxIsOpen: boolean };

export default class ModalExample extends Component<ProviderProps, State> {
  state = { lightboxIsOpen: false };
  toggleLightbox = () => {
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen,
    }));
  };
  render() {
    const { images, isLoading } = this.props;
    const { lightboxIsOpen } = this.state;

    return (
      <div>
        <Heading source="/CustomStyles/ModalExample.js">Modal Example</Heading>
        <p>
          In this example some components are extended to appear like a
          polaroid. Various elements react to <Code>mouseIsIdle</Code> by
          dimming, changing color or applying a CSS filter.
        </p>

        {!isLoading ? (
          <button onClick={this.toggleLightbox}>Open Modal</button>
        ) : null}

        <ModalGateway>
          {!isLoading && lightboxIsOpen ? (
            <Modal
              onClose={this.toggleLightbox}
              styles={{
                blanket: base => ({
                  ...base,
                  backgroundColor: '#fafafa',
                }),
                dialog: base => ({
                  ...base,
                  maxWidth: 740,
                }),
              }}
            >
              <Carousel
                views={images}
                styles={{
                  footer: base => ({
                    ...base,
                    background: '#fafafa !important',
                    borderTop: '1px solid #e5e5e5',
                    color: '#666',
                    paddingTop: 20,

                    '& a': {
                      color: 'black',
                    },
                  }),
                  header: base => ({
                    ...base,
                    background: '#fafafa !important',
                    borderBottom: '1px solid #e5e5e5',
                    paddingBottom: 10,
                  }),
                  headerButton: base => ({
                    ...base,
                    color: '#666',

                    ':hover': {
                      color: 'black',
                    },
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
    );
  }
}
