// @flow
// @jsx glam
import glam from 'glam';
import React, { Component } from 'react';

import Carousel, { Modal, ModalGateway } from '../../src/components';
import withImages from '../ImageProvider';

const flow = (
  <a href="https://flow.org" target="_blank">
    flow
  </a>
);
const features = [
  { icon: '🛠', text: <span>Comprehensively typed ({flow})</span> },
  { icon: '📱', text: 'Support for touch devices' },
  { icon: '📺', text: 'Fullscreen support on desktop devices' },
  { icon: '🖼', text: 'Carousel without modal dialog' },
  { icon: '🏖', text: 'No restrictions on data shape' },
  { icon: '🚀', text: 'Replaceable component architecture' },
];

const List = ({ items }) => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {items.map(({ icon, text }, j) => (
      <li key={j} style={{ alignItems: 'center', display: 'flex ' }}>
        <span style={{ fontSize: 20, marginRight: '0.5em', width: 20 }}>
          {icon}
        </span>
        <span style={{ fontSize: 14 }}>{text}</span>
      </li>
    ))}
  </ul>
);

type Props = {
  images: Array<{
    description: string,
    photographer: string,
    urls: {
      regular: string,
      thumb: string,
    },
  }>,
  isLoading: boolean,
};
type State = {
  currentView?: number,
  lightboxIsOpen: boolean,
};

class Home extends Component<Props, State> {
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
      <div
        css={{
          maxWidth: 640,
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <h1>
          React Images v1{' '}
          <small css={{ color: '#999', fontWeight: 500 }}>(alpha)</small>
        </h1>
        <p>
          A simple, responsive Lightbox component for ReactJS to display an
          array of images.
        </p>
        <p>
          Images courtesy of{' '}
          <strong>
            <a href="https://unsplash.com" target="_blank">
              Unsplash
            </a>
          </strong>.
        </p>
        <div
          css={{
            display: 'flex ',
            flexWrap: 'wrap',
            marginLeft: -2,
            marginRight: -2,
          }}
        >
          {images.map((data, j) => {
            return (
              <div
                key={j}
                css={{
                  backgroundColor: '#eee',
                  boxSizing: 'border-box',
                  flex: '0 1 calc(25% - 4px)',
                  margin: 2,
                  overflow: 'hidden',
                  paddingBottom: '16%',
                  position: 'relative',
                }}
              >
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
              </div>
            );
          })}
        </div>

        <h4>Features and updates:</h4>
        <List items={features} />
        {/* {images.length && (
          <Carousel
            frameProps={{ autoSize: 'height' }}
            trackProps={{ infinite: true }}
            views={images}
            components={{ Header: null }}
          />
        )}
        <Lorem count={1} /> */}

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

export default withImages(Home);
