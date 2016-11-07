# React Images

[![Join the chat at https://gitter.im/react-images/Lobby](https://badges.gitter.im/react-images/Lobby.svg)](https://gitter.im/react-images/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A simple, responsive lightbox component for displaying an array of images.


### Quick start


```bash
npm install --save react-images
```

```jsx
import React from 'react';
import Lightbox from 'react-images';

export default class Sample extends React.Component {
  ...
  render() {
    return (
      <Lightbox
        images={[{ src: 'http://example.com/img1.jpg' }, { src: 'http://example.com/img2.jpg' }]}
        isOpen={this.state.lightboxIsOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightbox}
      />
    );
  }
}
```


## Demo & Examples

Live demo: [jossmac.github.io/react-images](http://jossmac.github.io/react-images/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

### Using srcset

Example using srcset:
```jsx
<Lightbox
  images={LIGHTBOX_IMAGE_SET}
  ...
/>

const LIGHTBOX_IMAGE_SET = [
  {
    src: 'http://example.com/example/img1.jpg',
    srcset: [
      'http://example.com/example/img1_1024.jpg 1024w',
      'http://example.com/example/img1_800.jpg 800w',
      'http://example.com/example/img1_500.jpg 500w',
      'http://example.com/example/img1_320.jpg 320w',
    ],
  },
  {
    src: 'http://example.com/example/img2.jpg',
    srcset: [
      'http://example.com/example/img2_1024.jpg 1024w',
      'http://example.com/example/img2_800.jpg 800w',
      'http://example.com/example/img2_500.jpg 500w',
      'http://example.com/example/img2_320.jpg 320w',
    ],
  }
];

```

Notes on srcset support:

The srcset attribute is supported by some modern browsers.  Results of browser implementation and behaviour may vary. The sizes attribute uses the default maxWidth CSS property set to the image.  By default this is 80% so 80vw.

Another thing to note is that 'h' or height in the srcset attribute does not yet exist. Because of the nature of the fixed height of a Lightbox this is problematic for portrait sized images.  You will need to calculate what the best 'w' size for a portrait size ought to be given the height of the fixed viewport otherwise unnecessarily large images will be fetched. See issue: [https://github.com/ResponsiveImagesCG/picture-element/issues/86](https://github.com/ResponsiveImagesCG/picture-element/issues/86)

Read more about the srcset and sizes attributes here: [https://ericportis.com/posts/2014/srcset-sizes/](https://ericportis.com/posts/2014/srcset-sizes/).

### Adding Captions

Example using caption for the first image:

```jsx
<Lightbox
  images={LIGHTBOX_IMAGE_SET}
  ...
/>

const LIGHTBOX_IMAGE_SET = [
  {
    src: 'http://example.com/example/img1.jpg',
    caption: 'Sydney, Australia - Photo by Jill Smith',
  },
  {
    src: 'http://example.com/example/img2.jpg',
  }
];

```

Note that the caption is an entirely optional property, as can be seen in the first gallery on the [example page](http://jossmac.github.io/react-images/). The first image has a single line caption, the second demonstrates multiline, and the remaining images are without captions, entirely.

## Options

Property	|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
backdropClosesModal	|	bool	|	false	|	Allow users to exit the lightbox by clicking the backdrop
enableKeyboardInput | bool  | true  | Supports keyboard input - <code>esc</code>, <code>arrow left</code>, and <code>arrow right</code>
currentImage  | number  | 0 | The index of the image to display initially
customControls | array | undefined | An array of elements to display as custom controls on the top of lightbox
images  | array | undefined | Required. An array of objects containing valid src and srcset values of img element
imageCountSeparator  | String  | ' of ' | Customize separator in the image count
isOpen  | bool  | false | Whether or not the lightbox is displayed
onClickPrev | func | undefined | Fired on request of the previous image
onClickNext | func | undefined | Fired on request of the next image
onClose | func | undefined | Required. Handle closing of the lightbox
onClickImage | func | undefined | Handle click on image
onClickThumbnail | func | undefined | Handle click on thumbnail
preloadNextImage | bool | true | Based on the direction the user is navigating, preload the next available image
showCloseButton | bool  | true | Optionally display a close "X" button in top right corner
showImageCount | bool  | true | Optionally display image index, e.g., "3 of 20"
width | number  | 1024 | Maximum width of the carousel; defaults to 1024px
