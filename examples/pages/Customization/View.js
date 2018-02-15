// @flow
// @jsx glam
import glam from 'glam';
import React, { Component, type ElementRef } from 'react';
import rafScheduler from 'raf-schd';

import Icon from './Icon';

type UrlShape = {
  type: 'video/mp4' | 'video/ogg',
  src: string,
};

export type ViewShape = {
  poster: string,
  urls: Array<UrlShape>,
};

type ViewProps = { data: ViewShape, mouseIsIdle: boolean };
type ViewState = { paused: boolean, progress: number };

function calculateProgress({ currentTime, duration }) {
  return 100 / duration * currentTime;
}

export default class View extends Component<ViewProps, ViewState> {
  video: HTMLVideoElement;
  state = { paused: true, progress: 0 };
  componentDidMount() {
    this.video.addEventListener('play', this.handlePlay, false);
    this.video.addEventListener('timeupdate', this.handleTimeUpdate, false);
    this.video.addEventListener('pause', this.handlePause, false);
  }
  componentWillUnmount() {
    this.video.removeEventListener('play', this.handlePlay);
    this.video.addEventListener('timeupdate', this.handleTimeUpdate);
    this.video.removeEventListener('pause', this.handlePause);
  }
  handlePlay = () => {
    this.setState({ paused: false });
  };
  handleTimeUpdate = rafScheduler(() => {
    const progress = calculateProgress({
      currentTime: this.video.currentTime,
      duration: this.video.duration,
    });

    this.setState({ progress });
  });
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
  getVideo = (ref: ElementRef<*>) => {
    this.video = ref;
  };
  render() {
    const { data, mouseIsIdle } = this.props;
    const { progress } = this.state;
    const width = 854;

    return (
      <div
        css={{
          backgroundColor: 'black',
          lineHeight: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: width,
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <video
          autoPlay={false}
          controls={false}
          onClick={this.playOrPause}
          poster={data.poster}
          ref={this.getVideo}
          width={width}
        >
          {data.urls.map(vid => <source src={vid.src} type={vid.type} />)}
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
                  transition: 'width 333ms',
                }}
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
