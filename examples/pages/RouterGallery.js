// @flow
// @jsx glam
import glam from 'glam';
import React, { Component } from 'react';

import Carousel from '../../src/components';
import type { ProviderProps } from '../ImageProvider';
import type { RouterProps } from '../../src/types';

type IndicesType = Array<number>;
type Props = ProviderProps & RouterProps;

export default class RouterGallery extends Component<Props> {
  handleViewChange = (currentView: IndicesType) => {
    const { history } = this.props;

    history.push(`/router-gallery/${currentView[0].toString()}`);
  };
  getCurrentView() {
    const { match } = this.props;
    return match ? parseInt(match.params.currentView, 10) || 0 : 0;
  }
  render() {
    const { images, isLoading } = this.props;

    return (
      <div>
        <h1>Router Gallery</h1>
        <p>
          In this example we sync the <code>currentView</code> with the URL
          using react-router's <code>history.push</code> method
        </p>
        <p>
          Try navigating with the Carousel's buttons, then with the browser's
          back and forward buttons. The current view is also maintained on page
          refresh via <code>match.params</code>
        </p>
        {!isLoading ? (
          <Carousel
            frameProps={{ autoSize: 'height' }}
            trackProps={{
              currentView: this.getCurrentView(),
              onViewChange: this.handleViewChange,
            }}
            views={images}
            components={{ Header: null }}
          />
        ) : null}
      </div>
    );
  }
}
