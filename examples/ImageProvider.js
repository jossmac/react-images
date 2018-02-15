// @flow

import React, { Component, type ComponentType } from 'react';

type Images = Array<{
  description: string,
  photographer: string,
  user: {
    first_name: string,
    last_name: string,
    username: string,
  },
  urls: {
    regular: string,
    thumb: string,
  },
}>;
export type ProviderProps = {
  images: Images,
  isLoading: boolean,
};
type State = { images: Images, isLoading: boolean };

function formatImages(arr) {
  return arr.map(img => ({
    description: img.description,
    photographer: `${img.user.first_name} ${img.user.last_name}`,
    username: img.user.username,
    urls: img.urls,
  }));
}

export default function withImages(WrappedComponent: ComponentType<*>) {
  return class ImageProvider extends Component<{}, State> {
    state = { images: [], isLoading: true };
    componentDidMount() {
      const query = 'wildlife,animal';
      const url =
        'https://api.unsplash.com/search/photos/?page=1&per_page=12&query=';
      // const query = 'skyline,city';

      // $FlowFixMe: escape global `process.env.UNSPLASH_API_KEY`
      fetch(`${url}${query}&client_id=${process.env.UNSPLASH_API_KEY}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ images: data.results, isLoading: false });
        })
        .catch(err => {
          console.error('Error occured when fetching images', err);
        });
    }
    render() {
      const { images, isLoading } = this.state;

      return (
        <WrappedComponent
          images={images ? formatImages(images) : []}
          isLoading={isLoading}
          {...this.props}
        />
      );
    }
  };
}
