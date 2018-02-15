// @flow
// @jsx glam
import glam from 'glam';
import React, { Component } from 'react';

import Carousel from '../../src/components';

type ViewShape = {
  poster: string,
  src: string,
};

const videos = [
  {
    poster: 'https://peach.blender.org/wp-content/uploads/bbb-splash.png',
    src:
      'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_640x360.m4v',
  },
];

type Props = { data: ViewShape };
type State = { isPlaying: boolean };

class View extends Component<Props, State> {
  video: HTMLVideoElement;
  state = { isPlaying: false };
  playOrPause = () => {
    const { video } = this;

    if (video.paused) {
      video.play();
      this.setState({ isPlaying: true });
    } else {
      video.pause();
      this.setState({ isPlaying: false });
    }
  };
  getVideo = ref => {
    this.video = ref;
  };
  render() {
    const { data } = this.props;
    const { isPlaying } = this.state;

    return (
      <div>
        <video
          width="400"
          controls={false}
          poster={data.poster}
          ref={this.getVideo}
        >
          <source src={data.src} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <div>
          <button onClick={this.playOrPause}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
    );
  }
}

export default class Customization extends Component<Props> {
  render() {
    // const { images, isLoading } = this.props;
    console.log('customization', this.props);

    return (
      <div>
        <h1>Customization</h1>
        <Carousel
          frameProps={{ autoSize: 'height' }}
          views={videos}
          components={{ Footer: null, View }}
        />
      </div>
    );
  }
}
