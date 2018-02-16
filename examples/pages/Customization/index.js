// @flow

import React, { Component } from 'react';
import Carousel, { Modal, ModalGateway } from '../../../src/components';

import { videos } from './data';
import { Poster, Posters } from './Poster';
import View from './View';

type Props = {};
type State = { currentModal: number | null };
export default class Customization extends Component<Props, State> {
  state = { currentModal: null };
  toggleModal = (index: number | null = null) => {
    this.setState({ currentModal: index });
  };
  render() {
    const { currentModal } = this.state;

    return (
      <div>
        <h1>Customization</h1>
        <p>
          In this example the data passed to <code>views</code> contains source
          and poster information. The <code>&lt;View /&gt;</code> component has
          been replaced to render an HTML5 video tag and custom controls.
        </p>
        <p>
          Videos courtesy of{' '}
          <a href="https://peach.blender.org/" target="_blank">
            "Big Buck Bunny"
          </a>{' '}
          and{' '}
          <a href="https://durian.blender.org/" target="_blank">
            "Sintel"
          </a>
        </p>
        <Posters>
          {videos.map((vid, idx) => (
            <Poster
              key={idx}
              data={vid}
              onClick={() => this.toggleModal(idx)}
            />
          ))}
        </Posters>
        <ModalGateway>
          {Number.isInteger(currentModal) ? (
            <Modal
              allowFullscreen={false}
              closeOnBackdropClick={false}
              onClose={this.toggleModal}
            >
              <Carousel
                components={{ Footer: null, View }}
                frameProps={{ autoSize: 'height' }}
                trackProps={{ currentView: currentModal }}
                views={videos}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }
}
