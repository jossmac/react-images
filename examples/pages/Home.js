// @flow
// @jsx glam
import glam from 'glam';
import React, { Component } from 'react';

import Carousel, { Modal, ModalGateway } from '../../src/components';

const features = [
  {
    icon: '🛠',
    text: 'Comprehensively typed',
    link: (
      <a href="https://flow.org" target="_blank">
        flow
      </a>
    ),
  },
  {
    icon: '📱',
    text: 'Support for touch devices',
    link: (
      <a href="http://souporserious.github.io/react-view-pager" target="_blank">
        react-view-pager
      </a>
    ),
  },
  {
    icon: '📺',
    text: 'Fullscreen support on desktop devices',
    link: (
      <a href="https://github.com/snakesilk/react-fullscreen" target="_blank">
        react-full-screen
      </a>
    ),
  },
  { icon: '🖼', text: 'Carousel without modal dialog' },
  { icon: '🏖', text: 'No restrictions on data shape' },
  { icon: '🚀', text: 'Replaceable component architecture' },
];

const List = ({ items }) => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {items.map(({ icon, link, text }, j) => (
      <li key={j} style={{ alignItems: 'center', display: 'flex ' }}>
        <span style={{ fontSize: 20, marginRight: '0.5em', width: 20 }}>
          {icon}
        </span>
        <span style={{ fontSize: 14 }}>
          {text}
          {link ? (
            <span>
              {' '}
              &mdash; <strong>{link}</strong>
            </span>
          ) : null}
        </span>
      </li>
    ))}
  </ul>
);
const Gallery = props => (
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
const Image = props => (
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

export default class Home extends Component<Props, State> {
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
        <h1 style={{ alignItems: 'center', display: 'flex' }}>
          <img
            src="logo.svg"
            height="22"
            width="39"
            style={{ marginRight: 10, marginTop: 2 }}
          />
          <span>
            React Images v1
            <small css={{ color: '#999', fontWeight: 500 }}> (alpha)</small>
          </span>
        </h1>
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
