// @flow
// @jsx glam
import glam from 'glam';
import React, { Component } from 'react';
import Lorem from 'react-lorem-component';

import Carousel, { Modal, ModalGateway } from './components';
import { components } from './components/defaultComponents';
import './App.css';

const quality = 80;
const width = 1024;
function unsplash(id) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D`;
}

const images = [
  {
    src: unsplash('1437422061949-f6efbde0a471'),
    description: 'Blue mountains',
  },
  // Portrait image --> shouldn't break layout 😭
  {
    src: unsplash('1508604140312-8dc6638aec97'),
    description: 'Little wharf',
  },
  {
    src: unsplash('1421789665209-c9b2a435e3dc'),
    description: 'Baby forest',
  },
  {
    src: unsplash('1431794062232-2a99a5431c6c'),
    description: 'Cliff waterfall',
  },
  {
    src: unsplash('1470813740244-df37b8c1edcb'),
    description: 'Milky way above canyon',
  },
];

type State = {
  lightboxIsOpen: boolean,
  images: Array<{ src: string, description: string }>,
};

class App extends Component<{}, State> {
  state = { lightboxIsOpen: false, images: [] };
  toggleLightbox = () => {
    this.setState(state => ({ lightboxIsOpen: !state.lightboxIsOpen }));
  };
  componentDidMount() {
    this.setState({ images });
  }
  render() {
    const { lightboxIsOpen, images } = this.state;

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
        <Lorem count={1} />
        <button onClick={this.toggleLightbox}>Open lightbox</button>
        <Lorem count={4} />
        {images.length && (
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
        <Lorem count={5} />

        <ModalGateway>
          {lightboxIsOpen && images.length ? (
            <Modal onClose={this.toggleLightbox}>
              <Carousel frameProps={{ autoSize: 'height' }} views={images} />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }
}

export default App;
