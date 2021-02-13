// @flow

import React, { Component } from 'react'
import Carousel, { Modal, ModalGateway } from '../../../../src/components'

import { videos } from './data'
import { Poster, Posters } from './Poster'
import View from './View'
import { Code, Heading } from '../../components'

type Props = {}
type State = { currentModal: number | null }
export default class AlternativeMedia extends Component<Props, State> {
  state = { currentModal: null }
  toggleModal = (index: number | null = null) => {
    this.setState({ currentModal: index })
  }
  render() {
    const { currentModal } = this.state

    return (
      <div>
        <Heading source="/CustomComponents/AlternativeMedia/index.js">Alternative Media</Heading>
        <p>
          In this example the data passed to <Code>views</Code> contains source and poster information. The <Code>&lt;View /&gt;</Code> component has been
          replaced to render an HTML5 video tag and custom controls.
        </p>
        <p>
          Videos courtesy of{' '}
          <a href="https://peach.blender.org/" target="_blank">
            "Big Buck Bunny"
          </a>{' '}
          and{' '}
          <a href="https://durian.blender.org/" target="_blank">
            "Sintel"
          </a>
        </p>
        <Posters>
          {videos.map((vid, idx) => (
            <Poster key={idx} data={vid} onClick={() => this.toggleModal(idx)} />
          ))}
        </Posters>
        <ModalGateway>
          {Number.isInteger(currentModal) ? (
            <Modal allowFullscreen={false} closeOnBackdropClick={false} onClose={this.toggleModal}>
              <Carousel currentIndex={currentModal} components={{ Footer: null, View }} views={videos} />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    )
  }
}
