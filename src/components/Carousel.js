// @flow
// @jsx glam
import React, { Component, type ElementRef } from 'react';
import { findDOMNode } from 'react-dom';
import glam from 'glam';
import rafScheduler from 'raf-schd';
import { ViewPager, Frame, Track, View as PageView } from 'react-view-pager';

import {
  defaultComponents,
  type CarouselComponents,
} from './defaultComponents';
import { type ModalPropsForCarousel } from './Modal/Modal';
import { isTouch } from './utils';

type SpringConfig = { [key: string]: number };
export type fn = any => void;
export type IndicesType = Array<number>;
export type ViewsType = Array<{ [key: string]: any }>;
export type CarouselProps = {
  /* Replace any of the carousel components */
  components?: CarouselComponents,
  // See https://github.com/souporserious/react-view-pager#frame-props
  frameProps: {
    accessibility: boolean,
    autoSize: true | false | 'width' | 'height',
    springConfig: SpringConfig,
    tag: any,
  },
  /* Hide controls when the user is idle (listens to mouse move) */
  hideControlsWhenIdle?: boolean,
  /* When envoked within a modal, props are cloned from the modal */
  modalProps?: ModalPropsForCarousel,
  // See https://github.com/souporserious/react-view-pager#track-props
  trackProps: {
    align: number,
    animations: Array<{ props: string, stops: Array<[number, number]> }>,
    axis: 'x' | 'y',
    contain: boolean,
    currentView: any,
    flickTimeout: number,
    infinite: boolean,
    instant: boolean,
    onRest: fn,
    onScroll: fn,
    onSwipeEnd: fn,
    onSwipeMove: fn,
    onSwipeStart: fn,
    onViewChange: IndicesType => void,
    springConfig: SpringConfig,
    swipe: true | false | 'mouse' | 'touch',
    swipeThreshold: number,
    tag: any,
    viewsToMove: number,
    viewsToShow: number | 'auto',
  },
  /* The items to render in the carousel */
  views: ViewsType,
};

export type CarouselState = {
  activeIndices: IndicesType,
  footerHeight: number,
  headerHeight: number,
  mouseIsIdle: boolean,
};
const defaultProps = {
  hideControlsWhenIdle: true,
  trackProps: {
    currentView: 0,
    instant: true,
    swipe: 'touch',
  },
};

class Carousel extends Component<CarouselProps, CarouselState> {
  components: CarouselComponents;
  container: HTMLElement;
  footer: HTMLElement;
  frame: ElementRef<Frame>;
  header: HTMLElement;
  mounted: boolean = false;
  track: ElementRef<Track>;
  timer: number; // flow doesn't have a SetTimeout type. node thinks it's a number...

  static defaultProps = defaultProps;

  constructor(props: CarouselProps) {
    super(props);

    this.cacheComponents(props.components);

    const trackProps = this.getTrackProps(props);

    this.state = {
      activeIndices: [trackProps.currentView],
      footerHeight: 0,
      headerHeight: 0,
      mouseIsIdle: isTouch(),
    };
  }

  componentDidMount() {
    const { hideControlsWhenIdle, modalProps } = this.props;
    const isModal = Boolean(modalProps);

    this.mounted = true;

    this.getDimensions();

    if (hideControlsWhenIdle && this.container) {
      this.container.addEventListener('mousedown', this.handleMouseActivity);
      this.container.addEventListener('mousemove', this.handleMouseActivity);
    }
    if (isModal) {
      this.focusViewFrame();
    }
  }
  componentWillReceiveProps(nextProps: CarouselProps) {
    if (nextProps.components !== this.props.components) {
      this.cacheComponents(nextProps.components);
    }
  }
  componentWillUnmount() {
    this.mounted = false;

    if (this.props.hideControlsWhenIdle && this.container) {
      this.container.removeEventListener('mousedown', this.handleMouseActivity);
      this.container.removeEventListener('mousemove', this.handleMouseActivity);
      this.handleMouseActivity.cancel();
    }
  }
  cacheComponents = (comps?: CarouselComponents) => {
    this.components = defaultComponents(comps);
  };

  // ==============================
  // Refs
  // ==============================

  getContainer = (ref: HTMLElement) => {
    this.container = ref;
  };
  getFooter = (ref: HTMLElement) => {
    this.footer = ref;
  };
  getFrame = (ref: Frame) => {
    this.frame = findDOMNode(ref);
  };
  getHeader = (ref: HTMLElement) => {
    this.header = ref;
  };
  getTrack = (ref: Track) => {
    this.track = ref;
  };

  // ==============================
  // Utilities
  // ==============================

  getDimensions = () => {
    const headerHeight = this.header ? this.header.clientHeight : 0;
    const footerHeight = this.footer ? this.footer.clientHeight : 0;

    this.setState({ footerHeight, headerHeight });
  };
  getTrackProps = (props: CarouselProps) => {
    // combine defaultProps with consumer props to maintain expected behaviour
    return { ...defaultProps.trackProps, ...props.trackProps };
  };
  focusViewFrame = () => {
    if (this.frame && document.activeElement !== this.frame) {
      this.frame.focus();
    }
  };
  prev = () => {
    this.track.prev();
    this.focusViewFrame();
  };
  next = () => {
    this.track.next();
    this.focusViewFrame();
  };

  // ==============================
  // Handlers
  // ==============================

  handleMouseActivity = rafScheduler(() => {
    clearTimeout(this.timer);

    if (this.state.mouseIsIdle) {
      this.setState({ mouseIsIdle: false });
    }

    this.timer = setTimeout(() => {
      if (this.mounted) {
        this.setState({ mouseIsIdle: true });
      }
    }, 3000);
  });
  handleViewChange = (activeIndices: IndicesType) => {
    const { trackProps } = this.props;

    this.setState({ activeIndices });

    // call the consumer's onViewChange fn
    if (trackProps && trackProps.onViewChange) {
      trackProps.onViewChange(activeIndices);
    }
  };

  renderNavigation = () => {
    const { Navigation, NavigationItem } = this.components;
    const { trackProps, views } = this.props;
    const { activeIndices, mouseIsIdle } = this.state;

    const hasNext =
      trackProps.infinite || !activeIndices.includes(views.length - 1);
    const hasPrev = trackProps.infinite || !activeIndices.includes(0);

    if (!hasPrev && !hasNext) return null;

    return (
      <Navigation mouseIsIdle={mouseIsIdle}>
        {hasPrev && (
          <NavigationItem align="left" onClick={this.prev} title="Prev" />
        )}
        {hasNext && (
          <NavigationItem align="right" onClick={this.next} title="Next" />
        )}
      </Navigation>
    );
  };
  render() {
    const { Container, Footer, Header, View } = this.components;
    const { frameProps, trackProps, modalProps, views } = this.props;
    const {
      activeIndices,
      footerHeight,
      headerHeight,
      mouseIsIdle,
    } = this.state;

    const isFullscreen = Boolean(modalProps && modalProps.isFullscreen);

    return (
      <Container isFullscreen={isFullscreen} innerRef={this.getContainer}>
        {Header ? (
          <Header
            activeIndices={activeIndices}
            mouseIsIdle={mouseIsIdle}
            innerRef={this.getHeader}
            {...this.props}
            {...this.state}
          />
        ) : null}
        <ViewPager
          tag="main"
          style={{ flex: '1 1 auto', position: 'relative' }}
        >
          <Frame {...frameProps} ref={this.getFrame} style={{ outline: 0 }}>
            <Track
              {...trackProps}
              onViewChange={this.handleViewChange}
              ref={this.getTrack}
            >
              {views &&
                views.map((view, idx) => (
                  <PageView key={idx}>
                    <View
                      {...view}
                      footerHeight={footerHeight}
                      headerHeight={headerHeight}
                    />
                  </PageView>
                ))}
            </Track>
          </Frame>
          {this.renderNavigation()}
        </ViewPager>
        {Footer ? (
          <Footer
            activeIndices={activeIndices}
            mouseIsIdle={mouseIsIdle}
            innerRef={this.getFooter}
            {...this.props}
            {...this.state}
          />
        ) : null}
      </Container>
    );
  }
}
export default Carousel;
export type CarouselType = typeof Carousel;
