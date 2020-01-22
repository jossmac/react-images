// @flow
// @jsx glam

import glam from 'glam';
import React, { Component } from 'react';
import Carousel, { Modal, ModalGateway } from '../../../src/components';

import { Heading } from '../components';

type Props = {};
type State = { modalOpen: Boolean };

export default class GestureImageViewer extends Component<Props, State> {
  state = { modalOpen: false };

  toggleModal = (open: Boolean = false) => {
    this.setState({ modalOpen: open });
  };

  render() {
    const { images } = this.props;
    const { modalOpen } = this.state;

    console.log(images);

    return (
      <div>
        <Heading source="/patterns/GestureImageViewer.js">
          Image Viewer with Gestures
        </Heading>
        <p>On a PC: double-click to zoom, click and drag to pan.</p>
        <p>On mobile: double-tap or pinch to zoom, drag to pan.</p>
        <div
          style={{ cursor: 'zoom-in' }}
          onClick={e => {
            e.preventDefault();
            this.toggleModal(true);
          }}
        >
          <img
            src={images && images[0] ? images[0].source.regular : null}
            alt="An insanely cool image"
            draggable={false}
            style={{ maxHeight: 350, margin: 'auto' }}
          />
        </div>
        <ModalGateway>
          {modalOpen ? (
            <Modal
              onClose={() => {
                this.toggleModal(false);
              }}
              backdropClosesModal
              allowFullscreen={false}
              enableGestures
            >
              <Carousel views={images} />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }
}
