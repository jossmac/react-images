// @flow
// @jsx glam
import React, { Component, type ElementRef } from 'react';
import { findDOMNode } from 'react-dom';
import glam from 'glam';
import rafScheduler from 'raf-schd';
import { ViewPager, Frame, Track, View as PageView } from 'react-view-pager';

const viewPagerStyles = { flex: '1 1 auto', position: 'relative' };
const frameStyles = { outline: 0 };

import {
  defaultComponents,
  type CarouselComponents,
} from './defaultComponents';
import { defaultStyles, type StylesConfig } from '../styles';
import { type ModalProps } from './Modal/Modal';
import { className, isTouch } from '../utils';
import { type ViewsType } from '../types';

type SpringConfig = { [key: string]: number };
export type fn = any => void;
export type IndicesType = Array<number>;
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
  modalProps?: ModalProps,
  /* Style modifier methods */
  styles: StylesConfig,
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
  styles: {},
  trackProps: {
    currentView: 0,
    instant: !isTouch(),
    swipe: 'touch',
  },
};

class Carousel extends Component<CarouselProps, CarouselState> {
  commonProps: any; // TODO
  components: CarouselComponents;
  container: HTMLElement;
  footer: HTMLElement;
  frame: ElementRef<Frame>;
  header: HTMLElement;
  mounted: boolean = false;
  track: ElementRef<Track>;
  timer: TimeoutID;

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
      this.container.addEventListener('touchmove', this.handleMouseActivity);
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
      this.container.removeEventListener('touchmove', this.handleMouseActivity);
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

  hasPreviousView = (): boolean => {
    const { trackProps } = this.props;
    const { activeIndices } = this.state;

    return trackProps.infinite || !activeIndices.includes(0);
  };
  hasNextView = (): boolean => {
    const { trackProps, views } = this.props;
    const { activeIndices } = this.state;

    return trackProps.infinite || !activeIndices.includes(views.length - 1);
  };

  getStyles = (key: string, props: {}): {} => {
    const base = defaultStyles[key](props);
    base.boxSizing = 'border-box';
    const custom = this.props.styles[key];
    return custom ? custom(base, props) : base;
  };
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

  // ==============================
  // Renderers
  // ==============================

  renderNavigation = () => {
    const { Navigation, NavigationItem } = this.components;
    const { commonProps } = this;

    const showPrev = this.hasPreviousView();
    const showNext = this.hasNextView();
    const showNav = (showPrev || showNext) && Navigation;

    return showNav ? (
      <Navigation {...commonProps}>
        {showPrev && (
          <NavigationItem
            {...commonProps}
            align="left"
            innerProps={{
              onClick: this.prev,
              title: 'Prev',
            }}
          />
        )}
        {showNext && (
          <NavigationItem
            {...commonProps}
            align="right"
            innerProps={{
              onClick: this.next,
              title: 'Next',
            }}
          />
        )}
      </Navigation>
    ) : null;
  };
  renderFooter = () => {
    const {
      Footer,
      FooterContainer,
      FooterCaption,
      FooterCount,
    } = this.components;
    const { views } = this.props;
    const { activeIndices } = this.state;
    const { commonProps } = this;
    const index = activeIndices[0];

    return Footer ? (
      <Footer
        {...commonProps}
        components={{
          Container: FooterContainer,
          Caption: FooterCaption,
          Count: FooterCount,
        }}
        data={views[index]}
        innerProps={{ innerRef: this.getFooter }}
      />
    ) : null;
  };

  getCommonProps() {
    const { frameProps, trackProps, modalProps, views } = this.props;
    const isModal = Boolean(modalProps);
    const isFullscreen = Boolean(modalProps && modalProps.isFullscreen);
    const {
      activeIndices,
      footerHeight,
      headerHeight,
      mouseIsIdle,
    } = this.state;

    return {
      activeIndices,
      footerHeight,
      frameProps,
      getStyles: this.getStyles,
      headerHeight,
      isFullscreen,
      isModal,
      modalProps,
      mouseIsIdle,
      trackProps,
      views,
      carouselProps: this.props,
    };
  }
  render() {
    const { Container, Header, HeaderButton, View } = this.components;
    const { frameProps, trackProps, views } = this.props;
    const commonProps = (this.commonProps = this.getCommonProps());

    return (
      <Container {...commonProps} innerProps={{ innerRef: this.getContainer }}>
        {Header ? (
          <Header
            {...commonProps}
            components={{ Button: HeaderButton }}
            innerProps={{ innerRef: this.getHeader }}
          />
        ) : null}
        <ViewPager
          tag="main"
          style={viewPagerStyles}
          className={className('pager')}
        >
          <Frame
            {...frameProps}
            ref={this.getFrame}
            className={className('frame')}
            style={frameStyles}
          >
            <Track
              {...trackProps}
              className={className('track')}
              onViewChange={this.handleViewChange}
              ref={this.getTrack}
            >
              {views &&
                views.map((view, idx) => (
                  <PageView className={className('view-wrapper')} key={idx}>
                    <View {...commonProps} data={view} />
                  </PageView>
                ))}
            </Track>
          </Frame>
          {this.renderNavigation()}
        </ViewPager>
        {this.renderFooter()}
      </Container>
    );
  }
}
export default Carousel;
export type CarouselType = typeof Carousel;
