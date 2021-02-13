# React Images

### ⚠️ Warning!

**Don't use this in a new project.** This package hasn't been properly maintained in a long time and there are much better options available.

**Instead, try...**

- [React Responsive Carousel](http://react-responsive-carousel.js.org/)

---

A mobile-friendly, highly customizable, carousel component for displaying media in ReactJS.

### Browser support

Should work in every major browser... maybe even IE10 and IE11?

### Getting Started

Start by installing `react-images`

```bash
npm install react-images
```

or

```bash
yarn add react-images
```

**If you were using `0.x` versions:** library was significantly rewritten for `1.x` version and contains several breaking changes.
The best way to upgrade is to read the docs and follow the examples.

Please note that the default footer parses HTML automatically (such as `<b>I'm bold!</b>`) but it **does not implement any form of XSS or sanitisation**. You should do that yourself before passing it into the caption field of react-images.

### Using the Carousel

Import the carousel from `react-images` at the top of a
component and then use it in the render function.

```jsx
import React from 'react'
import Carousel from 'react-images'

const images = [{ source: 'path/to/image-1.jpg' }, { source: 'path/to/image-2.jpg' }]

class Component extends React.Component {
  render() {
    return <Carousel views={images} />
  }
}
```

### Using the Modal

Import the modal and optionally the modal gateway from
`react-images` at the top of a component and then use it in
the render function.

The `ModalGateway` will insert the modal just before the
end of your `<body />` tag.

```jsx
import React from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images'

const images = [{ source: 'path/to/image-1.jpg' }, { source: 'path/to/image-2.jpg' }]

class Component extends React.Component {
  state = { modalIsOpen: false }
  toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }))
  }
  render() {
    const { modalIsOpen } = this.state

    return (
      <ModalGateway>
        {modalIsOpen ? (
          <Modal onClose={this.toggleModal}>
            <Carousel views={images} />
          </Modal>
        ) : null}
      </ModalGateway>
    )
  }
}
```

### Advanced Image Lists

The simplest way to define a list of images for the carousel looks like:

```jsx
const images = [{ source: 'path/to/image-1.jpg' }, { source: 'path/to/image-2.jpg' }]
```

However, react-images supports several other properties on each image object than just `source`. For example:

```jsx
const image = {
  caption: "An image caption as a string, React Node, or a rendered HTML string",
  alt: "A plain string to serve as the image's alt tag",
  source: {
    download: "A URL to serve a perfect quality image download from",
    fullscreen: "A URL to load a very high quality image from",
    regular: "A URL to load a high quality image from",
    thumbnail: "A URL to load a low quality image from"
  };
}
```

All these fields are optional except `source`. Additionally, if using an object of URLs (rather than a plain string URL) as your `source`, you must specify the `regular` quality URL.
