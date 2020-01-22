// @flow
// @jsx glam
import React, { Component } from 'react';
import glam from 'glam';

import { Div, Img } from '../primitives';
import { type PropsWithStyles } from '../types';
import { className } from '../utils';
import { getSource } from './component-helpers';
import { render } from 'react-dom';

import Hammer from 'hammerjs';

type Props = PropsWithStyles & {
  data: Object,
  isFullscreen: boolean,
  isModal: boolean,
  enableGestures: boolean,
};

export const viewCSS = () => ({
  lineHeight: 0,
  position: 'relative',
  textAlign: 'center',
});

class View extends Component {
  constructor(props: Props) {
    super(props);

    // Gestures
    this.zoom = 1;
    this.posX = 0;
    this.posY = 0;
    this.scale = 1;
    this.last_scale = 1;
    this.last_posX = 0;
    this.last_posY = 0;
    this.max_pos_x = 0;
    this.max_pos_y = 0;
    this.transform = '';
    this.elem = null;
  }

  action(ev) {
    if (!this.props.enableGestures) return;

    this.transform = '';

    // Double Tap
    if (ev.type === 'betterdoubletap') {
      this.transform = 'translate3d(0, 0, 0) scale3d(2, 2, 1)';
      this.scale = 2;
      this.last_scale = 2;
      try {
        const val = window
          .getComputedStyle(this.elem, null)
          .getPropertyValue('-webkit-transform')
          .toString();
        if (val != 'matrix(1, 0, 0, 1, 0, 0)' && val !== 'none') {
          this.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
          this.scale = 1;
          this.last_scale = 1;
        }
      } catch (err) {}

      if (!this.transition) {
        this.transition = true;
        this.elem.style.transition = 'transform 0.5s';
      }

      this.elem.style.transform = this.transform;
      this.transform = '';
    }

    // Pan
    if (ev.type == 'pan') {
      if (this.transition) {
        this.transition = false;
        this.elem.style.transition = 'unset';
      }
    }

    if (this.scale != 1) {
      this.posX = this.last_posX + ev.deltaX;
      this.posY = this.last_posY + ev.deltaY;
      this.max_pos_x = Math.ceil(
        ((this.scale - 1) * this.elem.clientWidth) / 2
      );
      this.max_pos_y = Math.ceil(
        ((this.scale - 1) * this.elem.clientHeight) / 2
      );
      if (this.posX > this.max_pos_x) {
        this.posX = this.max_pos_x;
      }
      if (this.posX < -this.max_pos_x) {
        this.posX = -this.max_pos_x;
      }
      if (this.posY > this.max_pos_y) {
        this.posY = this.max_pos_y;
      }
      if (this.posY < -this.max_pos_y) {
        this.posY = -this.max_pos_y;
      }
    }

    // Pinch
    if (ev.type == 'pinch') {
      this.scale = Math.max(0.999, Math.min(this.last_scale * ev.scale, 4));

      if (this.transition) {
        this.transition = false;
        this.elem.style.transition = 'unset';
      }
    }
    if (ev.type == 'pinchend') {
      this.last_scale = this.scale;

      if (this.transition) {
        this.transition = false;
        this.elem.style.transition = 'unset';
      }
    }

    // Pan End
    if (ev.type == 'panend') {
      this.last_posX = this.posX < this.max_pos_x ? this.posX : this.max_pos_x;
      this.last_posY = this.posY < this.max_pos_y ? this.posY : this.max_pos_y;

      if (this.transition) {
        this.transition = false;
        this.elem.style.transition = 'unset';
      }
    }

    if (this.scale != 1) {
      this.transform =
        'translate3d(' +
        this.posX +
        'px,' +
        this.posY +
        'px, 0) ' +
        'scale3d(' +
        this.scale +
        ', ' +
        this.scale +
        ', 1)';
    }

    // Zoom
    if (ev.type == 'zoom') {
      this.scale = Math.max(0.999, Math.min(ev.scale, 4));
      this.last_scale = this.scale;

      if (this.scale == 1) {
        this.posX = 0;
        this.posY = 0;
      }

      if (this.scale) {
        this.transform =
          'translate3d(' +
          this.posX +
          'px,' +
          this.posY +
          'px, 0) ' +
          'scale3d(' +
          this.scale +
          ', ' +
          this.scale +
          ', 1)';
      }

      if (!this.transition) {
        this.transition = true;
        this.elem.style.transition = 'transform 0.5s';
      }
    }

    if (this.transform) {
      this.elem.style.transform = this.transform;
    }
  }

  onSwipe(event) {
    if (this.scale !== 1) {
      this.preventEvent(event);
    }
  }

  preventEvent(event) {
    event.preventDefault();
  }

  handleChangeZoom(type = -1) {
    let zoom;
    zoom = this.zoom + type;

    if (zoom >= 1 && zoom <= 4) this.zoom = zoom;

    this.action({
      type: 'zoom',
      deltaX: 0,
      deltaY: 0,
      scale: this.zoom,
    });
  }

  setHammerListener(ref) {
    if (this.hammer) {
      this.hammer.destroy();
    }

    // Set default view of image
    if (this.elem) {
      this.elem.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
    }

    if (ref) {
      this.elem = ref;
      this.hammer = new Hammer(ref);
      this.hammer.get('pinch').set({ enable: true });
      this.hammer.add(
        new Hammer.Tap({ event: 'betterdoubletap', taps: 2, threshold: 3 })
      );
      this.hammer.on('betterdoubletap pan panend pinch pinchend', event =>
        this.action(event)
      );
    }
  }

  componentWillUnmount() {
    if (this.hammer) {
      this.hammer.destroy();
    }
  }

  render() {
    const {
      data,
      formatters,
      getStyles,
      index,
      isFullscreen,
      isModal,
    } = this.props;

    const innerProps = {
      alt: formatters.getAltText({ data, index }),
      src: getSource({ data, isFullscreen }),
    };

    console.log(this.props.enableGestures);

    return (
      <Div
        css={getStyles('view', this.props)}
        className={className('view', { isFullscreen, isModal })}
      >
        <Img
          draggable={this.props.enableGestures ? 'false' : null}
          innerRef={
            this.props.enableGestures
              ? el => {
                  console.log(el);

                  if (this.currentIndex && this.currentIndex !== index) {
                    if (typeof this.props.onIndexChange === 'function') {
                      this.props.onIndexChange(currentIndex);
                    }

                    this.currentIndex = currentIndex;
                    this.setHammerListener(el);
                  }
                }
              : null
          }
          {...innerProps}
          className={className('view-image', { isFullscreen, isModal })}
          css={{
            height: 'auto',
            maxHeight: '100vh',
            maxWidth: '100vw',
            userSelect: 'none',
          }}
        />
      </Div>
    );
  }
}

export default View;
