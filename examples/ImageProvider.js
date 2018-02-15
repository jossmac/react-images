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

function formatImages(arr) {
  return arr.map(img => ({
    description: img.description,
    photographer: `${img.user.first_name} ${img.user.last_name}`,
    username: img.user.username,
    urls: img.urls,
  }));
}
function unsplashUrl() {
  const query = 'wildlife,animal';
  const url =
    'https://api.unsplash.com/search/photos/?page=1&per_page=12&query=';

  // $FlowFixMe: escape global `process.env.UNSPLASH_API_KEY`
  return `${url}${query}&client_id=${process.env.UNSPLASH_API_KEY}`;
}

const dataKey = 'example_images_data';

function getData() {
  return JSON.parse(window.localStorage.getItem(dataKey));
}
function setData(data) {
  window.localStorage.setItem(dataKey, JSON.stringify(data));

  return data;
}

export default function withImages(WrappedComponent: ComponentType<*>) {
  return class ImageProvider extends Component<{}, ProviderProps> {
    state = { images: [], isLoading: true };
    componentWillMount() {
      // using local storage to prevent API requests, don't want to exceed
      // the applications Unsplash limit
      const storedData = getData();

      // bail if images already available
      if (storedData) {
        this.setState({ images: storedData, isLoading: false });
        return;
      }

      // set state to force re-render on the route
      fetch(unsplashUrl())
        .then(res => res.json())
        .then(data => {
          const images = setData(formatImages(data.results));
          this.setState({ images, isLoading: false });
        })
        .catch(err => {
          console.error('Error occured when fetching images', err);
        });
    }
    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
}
