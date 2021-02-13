// @flow

import React, { Component, type ComponentType, type Node } from 'react'

type Source =
  | string
  | {
      download?: string,
      fullscreen?: string,
      regular: string,
      thumbnail?: string,
    }
type Author =
  | string
  | {
      avatar: string,
      name: string,
      url: string,
    }
type Images = Array<{
  caption?: string | Node,
  author?: Author,
  source: Source,
}>
export type ProviderProps = {
  images: Images,
  isLoading: boolean,
}

function transformPaths({ links, urls }) {
  return {
    download: links.download_location,
    fullscreen: urls.full,
    regular: urls.regular,
    thumbnail: urls.thumb,
  }
}
function getReferrerLink(username) {
  const id = 'react-images'
  return `https://unsplash.com/${username}?utm_source=${id}&utm_medium=referral`
}
function transformImageData(arr) {
  return arr.map(img => ({
    author: {
      avatar: img.user.profile_image.medium,
      name: img.user.name,
      url: getReferrerLink(img.user.username),
    },
    color: img.color,
    caption: img.description,
    createdAt: img.created_at,
    likes: img.likes,
    source: transformPaths(img),
    title: img.title,
  }))
}
function getApiUrl() {
  const query = 'wildlife,animal'
  const url = 'https://api.unsplash.com/search/photos/?page=1&per_page=12&query='

  // $FlowFixMe: escape global `process.env.UNSPLASH_API_KEY`
  return `${url}${query}&client_id=${process.env.UNSPLASH_API_KEY}`
}

const dataKey = 'react_images_docs'

function getData() {
  return JSON.parse(window.sessionStorage.getItem(dataKey))
}
function setData(data) {
  window.sessionStorage.setItem(dataKey, JSON.stringify(data))

  return data
}

export default function withImages(WrappedComponent: ComponentType<*>) {
  return class ImageProvider extends Component<{}, ProviderProps> {
    state = { images: [], isLoading: true }
    componentDidMount() {
      // using local storage to prevent API requests, don't want to exceed
      // the applications Unsplash limit
      const storedData = getData()

      // bail if images already available
      if (storedData) {
        this.setState({ images: storedData, isLoading: false })
        return
      }

      // set state to force re-render on the route
      fetch(getApiUrl())
        .then(res => res.json())
        .then(data => {
          console.log('data.results', data.results)
          const images = setData(transformImageData(data.results))
          this.setState({ images, isLoading: false })
        })
        .catch(err => {
          console.error('Error occured when fetching images', err)
        })
    }
    render() {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }
}
