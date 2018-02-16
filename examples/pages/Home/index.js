// @flow
// @jsx glam
import glam from 'glam';
import React, { Component } from 'react';

import Carousel, { Modal, ModalGateway } from '../../../src/components';
import { type ProviderProps } from '../../ImageProvider';

import { List, Gallery, Image, Title } from './components';
import { features } from './data';

type State = {
  currentView?: number,
  lightboxIsOpen: boolean,
};

export default class Home extends Component<ProviderProps, State> {
  state = {
    currentView: undefined,
    lightboxIsOpen: false,
  };
  toggleLightbox = (currentView: number) => {
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen,
      currentView,
    }));
  };
  render() {
    const { images, isLoading } = this.props;
    const { currentView, lightboxIsOpen } = this.state;

    return (
      <div>
        <Title />
        <p>
          A simple, responsive Lightbox component for ReactJS to display an
          array of images.
        </p>
        <p>
          Images courtesy of{' '}
          <a href="https://unsplash.com" target="_blank">
            Unsplash
          </a>
        </p>
        {!isLoading ? (
          <Gallery>
            {images.map((data, j) => {
              return (
                <Image key={data.username}>
                  <img
                    onClick={() => this.toggleLightbox(j)}
                    src={data.urls.thumb}
                    alt={data.description}
                    css={{
                      cursor: 'pointer',
                      position: 'absolute',
                      maxWidth: '100%',
                    }}
                  />
                </Image>
              );
            })}
          </Gallery>
        ) : null}

        <h4>Features and updates:</h4>
        <List items={features} />

        <ModalGateway>
          {lightboxIsOpen && !isLoading ? (
            <Modal onClose={this.toggleLightbox}>
              <Carousel
                frameProps={{ autoSize: 'height' }}
                trackProps={{ currentView }}
                views={images}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }
}
