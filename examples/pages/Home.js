// @flow
// @jsx glam
import glam from 'glam';
import React, { Component } from 'react';
import Lorem from 'react-lorem-component';

import Carousel, { Modal, ModalGateway } from '../../src/components';
import { components } from '../../src/components/defaultComponents';
import { images } from '../data';

const features = [
  {
    icon: '🛠',
    text: (
      <span>
        Comprehensively typed (<a href="https://flow.org" target="_blank">
          flow
        </a>)
      </span>
    ),
  },
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

type State = {
  carouselViews: Array<{ src: string, description: string }>,
  currentView?: number,
  lightboxIsOpen: boolean,
};

export default class Home extends Component<{}, State> {
  state = { carouselViews: [], currentView: undefined, lightboxIsOpen: false };
  toggleLightbox = (currentView: number) => {
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen,
      currentView,
    }));
  };
  componentDidMount() {
    this.setState({ carouselViews: images });
  }
  render() {
    const { carouselViews, currentView, lightboxIsOpen } = this.state;

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
        <List items={features} />
        <div css={{ display: 'flex ', marginLeft: -2, marginRight: -2 }}>
          {images.map((i, j) => {
            const img = images[j];
            return (
              <div css={{ flex: 1, marginLeft: 2, marginRight: 2 }}>
                <img
                  onClick={() => this.toggleLightbox(j)}
                  src={img.src}
                  alt={img.description}
                  css={{ cursor: 'pointer', maxWidth: '100%' }}
                />
              </div>
            );
          })}
        </div>
        <Lorem count={1} />
        {carouselViews.length && (
          <Carousel
            frameProps={{ autoSize: 'height' }}
            trackProps={{ infinite: true }}
            views={images}
            components={{
              Footer: null,
              Header: components.Footer,
            }}
          />
        )}
        <Lorem count={1} />

        <ModalGateway>
          {lightboxIsOpen && images.length ? (
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
