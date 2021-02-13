// @flow

import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import AlternativeMedia from './AlternativeMedia'
import ImageViewer from './ImageViewer'
import { Code, CodeBlock, Title } from '../components'

const propFn = k => {
  const style = { display: 'inline-block', marginBottom: 4, marginRight: 4 }
  return (
    <span key={k} style={style}>
      <Code>{k}</Code>
    </span>
  )
}
const commonProps = [
  'carouselProps',
  'currentIndex',
  'currentView',
  'frameProps',
  'getStyles',
  'isFullscreen',
  'isModal',
  'modalProps',
  'interactionIsIdle',
  'trackProps',
  'views',
]

export default class CustomComponents extends Component<*> {
  render() {
    return (
      <div>
        <Helmet>
          <title>Components - React Images</title>
          <meta
            name="description"
            content="React Images allows you to augment layout and functionality by
            replacing the default components with your own."
          />
        </Helmet>
        <Title>Components</Title>
        <p>
          The main feature of this library is providing consumers with the building blocks necessary to create <em>their</em> component.
        </p>
        <h3>Replacing Components</h3>
        <p>
          React-Images allows you to augment layout and functionality by replacing the default components with your own, using the <Code>components</Code>{' '}
          property. These components are given all the current props and state letting you achieve anything you dream up.
        </p>
        <h3>Inner Props</h3>
        <p>
          All functional properties that the component needs are provided in <Code>innerProps</Code> which you must spread.
        </p>
        <h3>Common Props</h3>
        <p>
          Every component receives <Code>commonProps</Code> which are spread onto the component. These include:
        </p>
        <p>{commonProps.map(propFn)}</p>
        <CodeBlock>
          {`import React from 'react';
import Carousel from 'react-images';

const CustomHeader = ({ innerProps, isModal }) => isModal ? (
  <div {...innerProps}>
    // your component internals
  </div>
) : null;

class Component extends React.Component {
  render() {
    return <Carousel components={{ Header: CustomHeader }} />;
  }
}`}
        </CodeBlock>

        <h2>Component API</h2>

        <h3>{'<Container />'}</h3>
        <p>Wrapper for the carousel. Attachment point for mouse and touch event listeners.</p>

        <h3>{'<Footer />'}</h3>
        <p>
          Element displayed beneath the views. Renders <Code>FooterCaption</Code> and <Code>FooterCount</Code> by default.
        </p>

        <h3>{'<FooterCaption />'}</h3>
        <p>
          Text associated with the current view. Renders <Code>{'{viewData.caption}'}</Code> by default.
        </p>

        <h3>{'<FooterCount />'}</h3>
        <p>
          How far through the carousel the user is. Renders{' '}
          <Code>
            {'{currentIndex}'}&nbsp;of&nbsp;{'{totalViews}'}
          </Code>{' '}
          by default
        </p>

        <h3>{'<Header />'}</h3>
        <p>
          Element displayed above the views. Renders <Code>FullscreenButton</Code> and <Code>CloseButton</Code> by default.
        </p>

        <h3>{'<HeaderClose />'}</h3>
        <p>
          The button to close the modal. Accepts the <Code>onClose</Code> function.
        </p>

        <h3>{'<HeaderFullscreen />'}</h3>
        <p>
          The button to fullscreen the modal. Accepts the <Code>toggleFullscreen</Code> function.
        </p>

        <h3>{'<Navigation />'}</h3>
        <p>
          Wrapper for the <Code>{'<NavigationNext />'}</Code> and <Code>{'<NavigationPrev />'}</Code> buttons.
        </p>

        <h3>{'<NavigationPrev />'}</h3>
        <p>
          Button allowing the user to navigate to the previous view. Accepts an <Code>onClick</Code> function.
        </p>

        <h3>{'<NavigationNext />'}</h3>
        <p>
          Button allowing the user to navigate to the next view. Accepts an <Code>onClick</Code> function.
        </p>

        <h3>{'<View />'}</h3>
        <p>
          The view component renders your media to the user. Receives the current view object as the <Code>data</Code> property.
        </p>

        <h2>Examples</h2>
        <ImageViewer {...this.props} />
        <AlternativeMedia />
      </div>
    )
  }
}
