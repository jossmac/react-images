// @flow

import React, { Component, type ComponentType } from 'react';

type Props = {};
type State = { images: Array<Object> | null };

function formatImages(arr) {
  return arr.map(img => ({
    description: img.description,
    photographer: `${img.user.first_name} ${img.user.last_name}`,
    username: img.user.username,
    urls: img.urls,
  }));
}

export default function withImages(WrappedComponent: ComponentType<*>) {
  return class ImageProvider extends Component<Props, State> {
    state = { images: null };
    componentDidMount() {
      const query = 'wildlife,animal';
      const url =
        'https://api.unsplash.com/search/photos/?page=1&per_page=12&query=';
      // const query = 'skyline,city';

      // $FlowFixMe: this is a thing
      fetch(`${url}${query}&client_id=${process.env.UNSPLASH_API_KEY}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ images: data.results });
        })
        .catch(err => {
          console.error('Error occured when fetching images', err);
        });
    }
    render() {
      const { images } = this.state;
      return (
        <WrappedComponent
          images={images ? formatImages(images) : []}
          isLoading={!images}
        />
      );
    }
  };
}
