// @flow

import React, { Component } from 'react';

import AlternativeMedia from './AlternativeMedia';
import { Code, CodeBlock } from '../components';

export default class CustomComponents extends Component<*> {
  render() {
    return (
      <div>
        <h1>Components</h1>
        <p>
          The main feature of this library is providing consumers with the
          building blocks necessary to create <em>their</em> component.
        </p>
        <h3>Replacing Components</h3>
        <p>
          React-Images allows you to augment layout and functionality by
          replacing the default components with your own, using the{' '}
          <Code>components</Code> property. These components are given all the
          current props and state letting you achieve anything you dream up.
        </p>
        <h3>Inner Props</h3>
        <p>
          All functional properties that the component needs are provided in{' '}
          <Code>innerProps</Code> which you must spread.
        </p>
        <CodeBlock>
          {`const images = [
  { src: '../image1.jpg', altText: 'Image one' },
  { src: '../image2.jpg', altText: 'Image two' }
];

const CustomHeader = ({ data, innerProps, isModal }) => {
  if (!isModal) return null;
  return (
    <div {...innerProps}>
      <img src={data.src} alt={data.altText} />
    </div>
  );
}

const App = () => (
  <Carousel
    components={{ Header: CustomHeader, Footer: null }}
    views={images}
  />
)`}
        </CodeBlock>
        <AlternativeMedia />
      </div>
    );
  }
}
