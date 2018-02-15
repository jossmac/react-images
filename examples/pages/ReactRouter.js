// @flow
// @jsx glam
import glam from 'glam';
import React, { Component } from 'react';

import Carousel from '../../src/components';
import { type ProviderProps } from '../ImageProvider';

type IndicesType = Array<number>;
type Props = ProviderProps & {
  activeIndices: IndicesType,
  history: any, // TODO
  location: any, // TODO
};

export default class ReactRouter extends Component<Props> {
  static defaultProps = {
    activeIndices: [0],
  };
  handleViewChange = (activeIndices: IndicesType) => {
    const { history } = this.props;
    history.push(activeIndices);
    console.log('activeIndices', activeIndices);
  };
  render() {
    const { activeIndices, images, isLoading } = this.props;

    console.log('router example', this.props);

    return (
      <div>
        <h1>React Router Example</h1>
        {!isLoading ? (
          <Carousel
            frameProps={{ autoSize: 'height' }}
            trackProps={{
              infinite: true,
              currentView: activeIndices,
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
