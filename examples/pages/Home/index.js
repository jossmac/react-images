// @flow
// @jsx glam
import glam from 'glam';
import React, { Component } from 'react';

import Carousel, { Modal, ModalGateway } from '../../../src/components';
import { type ProviderProps } from '../../ImageProvider';

import { List, Gallery, Image } from './components';
import { features } from './data';
import { Code, CodeBlock, Title } from '../components';

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
      <div>
        <Title>🌄 React Images</Title>
        <p>
          A simple, responsive Lightbox component for ReactJS to display an
          array of images. Images courtesy of{' '}
          <a href="https://unsplash.com" target="_blank">
            Unsplash
          </a>.
        </p>

        <h4>Features and updates in v1:</h4>
        <List items={features} />
        <h2>Getting Started</h2>
        <p>
          Start by installing <Code>react-images</Code>
        </p>
        <CodeBlock>yarn add react-images</CodeBlock>

        <h2>Using the Carousel</h2>
        <p>
          Import the carousel from <Code>react-images</Code> at the top of a
          component and then use it in the render function.
        </p>
        <CodeBlock>{`import React from 'react';
import Carousel from 'react-images';

const images = [{ src: 'path/to/image-1.jpg', src: 'path/to/image-2.jpg' }];

class Component extends React.Component {
  render() {
    return <Carousel views={images} />;
  }
}`}</CodeBlock>

        <h2>Using the Modal</h2>
        <p>
          Import the modal and optionally the modal gateway from{' '}
          <Code>react-images</Code> at the top of a component and then use it in
          the render function.
        </p>
        <p>
          The <Code>ModalGateway</Code> will insert the modal just before the
          end of your <Code>{'<body />'}</Code> tag.
        </p>
        <CodeBlock>{`import React from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';

const images = [{ src: 'path/to/image-1.jpg', src: 'path/to/image-2.jpg' }];

class Component extends React.Component {
  state = { modalIsOpen: false }
  toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
  }
  render() {
    const { modalIsOpen } = this.state;

    return (
      <ModalGateway>
        {modalIsOpen ? (
          <Modal onClose={this.toggleModal}>
            <Carousel views={images} />
          </Modal>
        ) : null}
      </ModalGateway>
    );
  }
}`}</CodeBlock>

        <h2>Example Gallery</h2>
        <p>
          Below is a pretty typical implementation; the index of the selected
          thumbnail is passed to the <Code>currentIndex</Code> property of the
          carousel. All of the components, styles, getters, animations and
          functionality are the defaults provided by the library.
        </p>
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
      </div>
    );
  }
}
