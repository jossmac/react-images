// @flow
// @jsx glam
import glam from 'glam';
import React, { Component } from 'react';

import Carousel from '../../src/components';
import type { ProviderProps } from '../ImageProvider';
import type { RouterProps } from '../../src/types';

type IndicesType = Array<number>;
type Props = ProviderProps & RouterProps;

export default class ReactRouter extends Component<Props> {
  handleViewChange = (currentView: IndicesType) => {
    const { history } = this.props;

    history.push(`/react-router/${currentView[0].toString()}`);
  };
  render() {
    const { images, isLoading, match } = this.props;
    const currentView = match ? parseInt(match.params.currentView, 10) || 0 : 0;

    console.log('router example', this.props);

    return (
      <div>
        <h1>React Router Example</h1>
        {!isLoading ? (
          <Carousel
            frameProps={{ autoSize: 'height' }}
            trackProps={{
              infinite: true,
              currentView,
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
