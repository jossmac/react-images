// @flow
// @jsx glam
import glam from 'glam';
import React, { Component, Fragment } from 'react';

import { type ProviderProps } from '../../ImageProvider';
import Carousel, { Modal, ModalGateway } from '../../../src/components';

type State = {
  selectedIndex?: number,
  lightboxIsOpen: boolean,
};

export default class Home extends Component<ProviderProps, State> {
  state = {
    selectedIndex: 0,
    lightboxIsOpen: false,
  };
  toggleLightbox = (selectedIndex: number) => {
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen,
      selectedIndex,
    }));
  };
  render() {
    const { images, isLoading } = this.props;
    const { selectedIndex, lightboxIsOpen } = this.state;

    return (
      <Fragment>
        {!isLoading ? (
          <Gallery>
            {images.map((data, j) => {
              return (
                <Image
                  onClick={() => this.toggleLightbox(j)}
                  key={data.username}
                >
                  <img
                    src={data.urls.thumb}
                    alt={data.caption}
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

        <ModalGateway>
          {lightboxIsOpen && !isLoading ? (
            <Modal onClose={this.toggleLightbox}>
              <Carousel
                currentIndex={selectedIndex}
                frameProps={{ autoSize: 'height' }}
                views={images}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </Fragment>
    );
  }
}

const Gallery = (props: any) => (
  <div
    css={{
      display: 'flex ',
      flexWrap: 'wrap',
      marginLeft: -2,
      marginRight: -2,
    }}
    {...props}
  />
);

const Image = (props: any) => (
  <div
    css={{
      backgroundColor: '#eee',
      boxSizing: 'border-box',
      flex: '0 1 calc(25% - 4px)',
      margin: 2,
      overflow: 'hidden',
      paddingBottom: '16%',
      position: 'relative',

      ':hover': {
        opacity: 0.9,
      },
    }}
    {...props}
  />
);
