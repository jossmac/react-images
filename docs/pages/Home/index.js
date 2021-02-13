// @flow
// @jsx glam
import glam from 'glam'
import React, { Component } from 'react'

import { type ProviderProps } from '../../ImageProvider'
import { Code, CodeBlock, Heading, Title } from '../components'
import PrettyProps from '../../PrettyProps'
import GalleryExample from './GalleryExample'
import { carouselProps, modalProps } from './props'

export default class Home extends Component<ProviderProps> {
  render() {
    return (
      <div>
        <Title>React Images</Title>
        <p>
          A mobile-friendly, highly customizable, carousel component for displaying media in ReactJS. Images courtesy of{' '}
          <a href="https://unsplash.com" target="_blank">
            Unsplash
          </a>
          .
        </p>

        <h3>Getting Started</h3>
        <p>
          Start by installing <Code>react-images</Code>
        </p>
        <CodeBlock>yarn add react-images</CodeBlock>

        <h3>Using the Carousel</h3>
        <p>
          Import the carousel from <Code>react-images</Code> at the top of a component and then use it in the render function.
        </p>
        <CodeBlock>{`import React from 'react';
import Carousel from 'react-images';

const images = [{ source: 'path/to/image-1.jpg' }, { source: 'path/to/image-2.jpg' }];

class Component extends React.Component {
  render() {
    return <Carousel views={images} />;
  }
}`}</CodeBlock>

        <h3>Using the Modal</h3>
        <p>
          Import the modal and optionally the modal gateway from <Code>react-images</Code> at the top of a component and then use it in the render function.
        </p>
        <p>
          The <Code>ModalGateway</Code> will insert the modal just before the end of your <Code>{'<body />'}</Code> tag.
        </p>
        <CodeBlock>{`import React from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';

const images = [{ src: 'path/to/image-1.jpg' }, { src: 'path/to/image-2.jpg' }];

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

        <Heading source="/Home/GalleryExample.js">Example Gallery</Heading>
        <p>
          Below is a pretty typical implementation; the index of the selected thumbnail is passed to the <Code>currentIndex</Code> property of the carousel. All
          of the components, styles, getters, animations and functionality are the defaults provided by the library.
        </p>
        <GalleryExample {...this.props} />

        <h2>Carousel Props</h2>
        {carouselProps.map(p => (
          <PrettyProps key={p.name} {...p} />
        ))}

        <h2>Modal Props</h2>
        {modalProps.map(p => (
          <PrettyProps key={p.name} {...p} />
        ))}
      </div>
    )
  }
}
