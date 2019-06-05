# React Images

A mobile-friendly, highly customizable, carousel component for displaying media in ReactJS.

### Getting Started

Start by installing `react-images`

```bash
yarn add react-images
```
or
```bash
yarn add react-images
```

### Using the Carousel

Import the carousel from `react-images` at the top of a
component and then use it in the render function.

```jsx
import React from 'react';
import Carousel from 'react-images';

const images = [{ src: 'path/to/image-1.jpg', src: 'path/to/image-2.jpg' }];

class Component extends React.Component {
  render() {
    return <Carousel views={images} />;
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
import React from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';

const images = [{ src: 'path/to/image-1.jpg', src: 'path/to/image-2.jpg' }];

class Component extends React.Component {
  state = { modalIsOpen: false };
  toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
  };
  render() {
    const { modalIsOpen } = this.state;

    return (
      <ModalGateway>
        {modalIsOpen ? (
          <Modal onClose={this.toggleModal}>
            <Carousel views={images} />
          </Modal>
        ) : null}
      </ModalGateway>
    );
  }
}
```
