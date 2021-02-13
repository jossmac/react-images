// @flow
// @jsx glam
import glam from 'glam'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import Carousel, { Modal, ModalGateway } from '../../src/components'
import { type ProviderProps } from '../ImageProvider'

import { Code, Title } from './components'

const Table = props => (
  <table
    css={{
      borderCollapse: 'collapse',
      borderSpacing: 0,
      border: 0,
    }}
    {...props}
  />
)
const Cell = props => <td css={{ padding: 4 }} {...props} />

type State = {
  currentView?: number,
  lightboxIsOpen: boolean,
}

export default class Accessibility extends Component<ProviderProps, State> {
  state = {
    currentView: undefined,
    lightboxIsOpen: false,
  }
  toggleLightbox = (currentView: number) => {
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen,
      currentView,
    }))
  }
  render() {
    const { images, isLoading } = this.props
    const { currentView, lightboxIsOpen } = this.state

    return (
      <div>
        <Helmet>
          <title>Accessibility - React Images</title>
          <meta
            name="description"
            content="React-Images comes with accessible features out-of-the box. Keyboard
            support, roles, and aria-attribution on the applicable elements."
          />
        </Helmet>
        <Title>Accessibility</Title>
        <p>React-Images comes with accessible features out-of-the box. Keyboard support, roles, and aria-attribution on the applicable elements.</p>

        <h2>Keyboard Support</h2>
        <h3>Carousel</h3>
        <Table>
          <tbody>
            <tr>
              <Cell width={60}>
                <Code>Left</Code>
              </Cell>
              <Cell>move to the previous view</Cell>
            </tr>
            <tr>
              <Cell width={60}>
                <Code>Right</Code>
              </Cell>
              <Cell>move to the next view</Cell>
            </tr>
            <tr>
              <Cell width={60}>
                <Code>Home</Code>
              </Cell>
              <Cell>move to the first view</Cell>
            </tr>
            <tr>
              <Cell width={60}>
                <Code>End</Code>
              </Cell>
              <Cell>move to the last view</Cell>
            </tr>
            <tr>
              <Cell width={60}>
                <Code>1-9</Code>
              </Cell>
              <Cell>number keys navigate to their respective view</Cell>
            </tr>
          </tbody>
        </Table>

        <h3>Modal</h3>
        <Table>
          <tbody>
            <tr>
              <Cell width={60}>
                <Code>Esc</Code>
              </Cell>
              <Cell>closes the modal</Cell>
            </tr>
            <tr>
              <Cell width={60}>
                <Code>F</Code>
              </Cell>
              <Cell>toggles full screen</Cell>
            </tr>
          </tbody>
        </Table>
        {/* <p>
          // move to the previous view case 'ArrowUp': // move to the next view
          case 'ArrowDown': // move to first view case 'Home': // move to last
          view case 'End': // 1 - 9 keys mapped to respective slide number
        </p> */}
        <ModalGateway>
          {lightboxIsOpen && !isLoading ? (
            <Modal onClose={this.toggleLightbox}>
              <Carousel trackProps={{ currentView }} views={images} />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    )
  }
}
