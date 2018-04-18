// @flow
// @jsx glam
import glam from 'glam';
import React, { Component } from 'react';

import type { ViewsType } from '../../types';
import { Div } from '../../primitives';

import Thumbnail from './Thumbnail';

export const paginationContainerCSS = () => ({
  bottom: 0,
  height: 24,
  left: '50%',
  padding: '0 50px',
  position: 'absolute',
  textAlign: 'center',
  transform: 'translateX(-50%)',
  whiteSpace: 'nowrap',
});

type Props = {
  currentIndex: number,
  components: {
    PageNav: ComponentType<*>,
    PageNavNext: ComponentType<*>,
    PageNavPrev: ComponentType<*>,
    Thumbnail: ComponentType<*>,
  },
  views: ViewsType,
  pageOffset: number,
  onClickThumbnail: () => void,
};
type State = { hasCustomPage: false };

export default class PageNav extends Component<Props, State> {
  state = { hasCustomPage: false };
  componentWillReceiveProps(nextProps) {
    // Component should be controlled, flush state when currentIndex changes
    if (nextProps.currentIndex !== this.props.currentIndex) {
      this.setState({
        hasCustomPage: false,
      });
    }
  }

  // ==============================
  // METHODS
  // ==============================

  getFirst() {
    const { currentIndex, pageOffset } = this.props;
    if (this.state.hasCustomPage) {
      return this.clampFirst(this.state.first);
    }
    return this.clampFirst(currentIndex - pageOffset);
  }
  setFirst(event, newFirst) {
    const { first } = this.state;

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (first === newFirst) return;

    this.setState({
      hasCustomPage: true,
      first: newFirst,
    });
  }
  gotoPrev(event) {
    this.setFirst(event, this.getFirst() - this.props.pageOffset);
  }
  gotoNext(event) {
    this.setFirst(event, this.getFirst() + this.props.pageOffset);
  }
  clampFirst(value) {
    const { views, pageOffset } = this.props;

    const totalCount = 2 * pageOffset + 1; // show $pageOffset extra thumbnails on each side

    if (value < 0) {
      return 0;
    } else if (value + totalCount > views.length) {
      // Too far
      return views.length - totalCount;
    } else {
      return value;
    }
  }

  // ==============================
  // RENDERERS
  // ==============================

  renderArrowPrev() {
    const { PageNavPrev } = this.props.components;
    if (this.getFirst() <= 0) return null;

    return (
      <PageNavPrev
        onClick={this.gotoPrev}
        style={arrowStyles}
        title="Previous (Left arrow key)"
        type="button"
      />
    );
  }
  renderArrowNext() {
    const { PageNavNext, pageOffset, views } = this.props;
    const totalCount = 2 * pageOffset + 1;
    if (this.getFirst() + totalCount >= views.length) return null;

    return (
      <PageNavNext
        onClick={this.gotoNext}
        style={arrowStyles}
        title="Next (Right arrow key)"
        type="button"
      />
    );
  }
  render() {
    const {
      getStyles,
      views,
      currentIndex,
      onClickThumbnail,
      pageOffset,
    } = this.props;

    const totalCount = 2 * pageOffset + 1; // show $pageOffset extra thumbnails on each side
    let thumbnails = [];
    let baseOffset = 0;
    if (views.length <= totalCount) {
      thumbnails = views;
    } else {
      // Try to center current image in list
      baseOffset = this.getFirst();
      thumbnails = views.slice(baseOffset, baseOffset + totalCount);
    }

    return (
      <PageNav>
        {this.renderArrowPrev()}
        {thumbnails.map((img, idx) => (
          <Thumbnail
            key={baseOffset + idx}
            {...img}
            index={baseOffset + idx}
            onClick={onClickThumbnail}
            active={baseOffset + idx === currentIndex}
          />
        ))}
        {this.renderArrowNext()}
      </PageNav>
    );
  }
}
