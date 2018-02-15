// @flow
// @jsx glam
import glam from 'glam';
import React, { Component } from 'react';

import Carousel, { Modal, ModalGateway } from '../../src/components';

const poster = 'https://peach.blender.org/wp-content/uploads/bbb-splash.png';
const src =
  'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_640x360.m4v';
const videos = [{ poster, src }];

type ViewShape = {
  poster: string,
  src: string,
};

type IconProps = { size: number, type: 'play' | 'pause' };
const Icon = ({ size = 64, type }: IconProps) => {
  const get = {
    play: (
      <path d="M12 20.016c4.406 0 8.016-3.609 8.016-8.016s-3.609-8.016-8.016-8.016-8.016 3.609-8.016 8.016 3.609 8.016 8.016 8.016zM12 2.016c5.531 0 9.984 4.453 9.984 9.984s-4.453 9.984-9.984 9.984-9.984-4.453-9.984-9.984 4.453-9.984 9.984-9.984zM9.984 16.5v-9l6 4.5z" />
    ),
    pause: (
      <path d="M12.984 15.984v-7.969h2.016v7.969h-2.016zM12 20.016c4.406 0 8.016-3.609 8.016-8.016s-3.609-8.016-8.016-8.016-8.016 3.609-8.016 8.016 3.609 8.016 8.016 8.016zM12 2.016c5.531 0 9.984 4.453 9.984 9.984s-4.453 9.984-9.984 9.984-9.984-4.453-9.984-9.984 4.453-9.984 9.984-9.984zM9 15.984v-7.969h2.016v7.969h-2.016z" />
    ),
  };

  return (
    <svg
      role="presentation"
      viewBox="0 0 24 24"
      css={{
        display: 'inline-block',
        fill: 'currentColor',
        height: size,
        stroke: 'currentColor',
        strokeWidth: 0,
        width: size,
      }}
    >
      {get[type]}
    </svg>
  );
};

type ViewProps = { data: ViewShape, mouseIsIdle: boolean };
type ViewState = { paused: boolean };

function calculateProgress({ currentTime, duration }) {
  return 100 / duration * currentTime;
}

class View extends Component<ViewProps, ViewState> {
  video: HTMLVideoElement;
  state = { paused: true };
  componentDidMount() {
    this.video.addEventListener('play', this.handlePlay, false);
    this.video.addEventListener('pause', this.handlePause, false);
  }
  componentWillUnmount() {
    this.video.removeEventListener('play', this.handlePlay);
    this.video.removeEventListener('pause', this.handlePause);
  }
  handlePlay = () => {
    this.setState({ paused: false });
  };
  handlePause = () => {
    this.setState({ paused: true });
  };
  playOrPause = () => {
    const { video } = this;

    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  };
  getVideo = ref => {
    this.video = ref;
  };
  render() {
    const { data, mouseIsIdle } = this.props;

    return (
      <div
        css={{ backgroundColor: 'black', lineHeight: 0, position: 'relative' }}
      >
        <video
          autoPlay
          controls={false}
          poster={data.poster}
          ref={this.getVideo}
          width="854"
        >
          <source src={data.src} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        {this.video ? (
          <div
            css={{
              alignItems: 'center',
              bottom: 0,
              display: 'flex ',
              left: 0,
              opacity: mouseIsIdle ? 0 : 1,
              padding: 10,
              position: 'absolute',
              right: 0,
              transition: 'opacity 300ms',
            }}
            style={{
              background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.44))',
            }}
          >
            <button
              css={{
                background: 0,
                border: 0,
                color: 'white',
                cursor: 'pointer',
                marginRight: 10,
                outline: 0,
                padding: 0,
                opacity: 0.66,
                ':hover': { opacity: 1 },
              }}
              onClick={this.playOrPause}
            >
              <Icon type={this.state.paused ? 'play' : 'pause'} size={32} />
            </button>
            <div
              css={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 4,
                flex: 1,
                height: 8,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                css={{
                  backgroundColor: 'white',
                  borderRadius: 4,
                  top: 0,
                  left: 0,
                  bottom: 0,
                  position: 'absolute',
                  transition: 'width 150ms',
                }}
                style={{
                  width: `${calculateProgress({
                    currentTime: this.video.currentTime,
                    duration: this.video.duration,
                  })}%`,
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
const Poster = ({ onClick }) => (
  <div onClick={onClick} css={{ background: '#eee', position: 'relative' }}>
    <img src={poster} css={{ maxWidth: '100%' }} />
    <button
      css={{
        background: 0,
        border: 0,
        color: 'white',
        cursor: 'pointer',
        padding: 0,
        height: 64,
        left: '50%',
        marginLeft: -32,
        marginTop: -32,
        opacity: 0.66,
        outline: 0,
        position: 'absolute',
        top: '50%',
        transition: 'opacity 200ms',
        width: 64,

        ':hover': { opacity: 1 },
      }}
    >
      <Icon type="play" />
    </button>
  </div>
);

type Props = {};
type State = { modalIsOpen: boolean };
export default class Customization extends Component<Props, State> {
  state = { modalIsOpen: false };
  toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
  };
  render() {
    const { modalIsOpen } = this.state;

    return (
      <div>
        <h1>Customization</h1>
        <p>
          In this example the data passed to <code>views</code> is contains
          source and poster information. The <code>&lt;View /&gt;</code>{' '}
          component has been replaced to render an HTML5 video tag and custom
          controls.
        </p>
        <p>
          Video courtesy of{' '}
          <a href="https://peach.blender.org/" target="_blank">
            "Big Buck Bunny"
          </a>
        </p>
        <Poster onClick={this.toggleModal} />
        <ModalGateway>
          {modalIsOpen ? (
            <Modal allowFullscreen={false} onClose={this.toggleModal}>
              <Carousel
                components={{ Footer: null, View }}
                frameProps={{ autoSize: 'height' }}
                views={videos}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }
}
