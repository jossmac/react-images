// @flow
// @jsx glam
import glam from 'glam'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import type { ProviderProps } from '../../ImageProvider'
import type { RouterProps } from '../../../src/types'
import { Code, CodeBlock, Title } from '../components'
import CarouselExample from './CarouselExample'
import ModalExample from './ModalExample'

type Props = ProviderProps & RouterProps

const keyFn = k => {
  const style = { display: 'inline-block', marginBottom: 4, marginRight: 4 }
  return (
    <span key={k} style={style}>
      <Code>{k}</Code>
    </span>
  )
}
const carouselKeys = [
  'container',
  'footer',
  'footerCaption',
  'footerCount',
  'header',
  'headerClose',
  'headerFullscreen',
  'navigation',
  'navigationPrev',
  'navigationNext',
  'view',
]
const modalKeys = ['blanket', 'dialog', 'positioner']

export default class CustomStyles extends Component<Props> {
  render() {
    return (
      <div>
        <Helmet>
          <title>Styles - React Images</title>
          <meta
            name="description"
            content="React Images offers a flexible, light-weight styling framework which
            is a thin abstraction over simple javascript objects."
          />
        </Helmet>
        <Title>Styles</Title>
        <p>
          React-Images offers a flexible, light-weight styling framework which is a thin abstraction over simple javascript objects using{' '}
          <a href="https://github.com/threepointone/glam" target="_blank">
            glam
          </a>
          .
        </p>
        <CodeBlock>
          {`/**
* @param {Object} base -- the component's default style
* @param {Object} state -- the component's current state e.g. \`isModal\`
* @returns {Object}
*/
function styleFn(base, state) {
  // optionally spread base styles
  return { ...base, color: state.isModal ? 'blue' : 'red' };
}`}
        </CodeBlock>
        <h3>Style Object</h3>
        <p>
          Each component is keyed, and ships with default styles. The component's default style object is passed as the first argument to the function when it's
          resolved.
        </p>
        <p>
          The second argument is the current state of the carousel, features like <Code>interactionIsIdle</Code>, <Code>isModal</Code> etc. allowing you to
          implement dynamic styles for each of the components.
        </p>
        <h6>Carousel Keys</h6>
        <p>{carouselKeys.map(keyFn)}</p>
        <h6>Modal Keys</h6>
        <p>{modalKeys.map(keyFn)}</p>
        <h3>Base and State</h3>
        <p>
          Spreading the base styles into your returned object let's you extend it however you like while maintaining existing styles. Alternatively, you can
          omit the base and completely take control of the component's styles.
        </p>
        <CodeBlock>
          {`const customStyles = {
  header: (base, state) => ({
    ...base,
    borderBottom: '1px dotted pink',
    color: state.isFullscreen ? 'red' : 'blue',
    padding: 20,
  }),
  view: () => ({
    // none of react-images styles are passed to <View />
    height: 400,
    width: 600,
  }),
  footer: (base, state) => {
    const opacity = state.interactionIsIdle ? 0 : 1;
    const transition = 'opacity 300ms';

    return { ...base, opacity, transition };
  }
}

const App = () => (
  <Carousel
    styles={customStyles}
    views={...}
  />
);`}
        </CodeBlock>
        <CarouselExample {...this.props} />
        <ModalExample {...this.props} />
      </div>
    )
  }
}
