# React-Images

### v0.5.2 / 2016-11-17
- Fix: keydown listeners thanks to [aknuds1](https:github.com/aknuds1) [archr](https:github.com/archr)
- Fix: thumbnail click propagation thanks to [GregoryPotdevin](https://github.com/GregoryPotdevin)
- Update: use abstracted ScrollLock component

### v0.5.1 / 2016-08-21
* Feature: Support theming with aphrodite classes
* Examples: Update options with new new prop details

### v0.5.0 / 2016-08-20
* Feature: Added a thumbnail preview beneath the lightbox thanks to [GregoryPotdevin](https://github.com/GregoryPotdevin)
* Feature: Re-implemented the layout using `flexbox`
* Examples: Replaced local images with hot-linked Unsplash photographs

### v0.4.11 / 2016-08-15
* Feature: Pre-load the next image based on user intention, uses new prop `preloadNextImage`
* Fix: bug with `enableKeyboardInput` where images fail to render thanks to [benhowell](https://github.com/benhowell)
* Bump dev dependencies for `react` and `react-dom` to `15.3.0`
* Increase the default max-width of the Lightbox to `1024px`

### v0.4.10 / 2016-08-11
* Fix react PropTypes warning. See [fixing-the-false-positive](https://facebook.github.io/react/warnings/dont-call-proptypes.html#fixing-the-false-positive-in-third-party-proptypes)
* Simplify fade transition using `react-css-addons-transition-group`

### v0.4.9 / 2016-07-28
* Resolve react "no-unused-prop" warnings [benhowell](https://github.com/benhowell)

### v0.4.7 / 2016-07-14
* Custom controls thanks to [robintail](https://github.com/robintail)
* dependency fix for `react-addons-transition-group` thanks to [fend25](https://github.com/fend25)

### v0.4.6 / 2016-05-17
* General cleanup

### v0.4.5 / 2016-05-16
* Added `imageCountSeparator` prop to replace " of " in the image count

### v0.4.4 / 2016-05-16
* Account for scrollbar width when opening/closing the lightbox
* Remove required flag on `onClickNext` and `onClickPrev` - may only render a single image
* Increase dialog z-index to `2001` thanks to [newsiberian](https://github.com/newsiberian)

### v0.4.3 / 2016-05-16
* Resolve peer-dependency issues thanks to [jedwatson](https://github.com/jedwatson)

### v0.4.2 / 2016-05-14
* Update dependencies

### v0.4.1 / 2016-05-12
* Update peer dependencies

### v0.4.0 / 2016-05-12
* Bump all applicable dependencies
* Remove peer dependencies

* * *

### v0.3.3 / 2016-05-12
* Updated website with more info + new design
* Introduction of `onClickImage` prop thanks to [pradel](https://github.com/pradel)
* Documentation for `showImageCount` thanks to [neptunian](https://github.com/neptunian)

### v0.3.2 / 2016-01-20
* Fix backdropClosesModal behaviour
* Update defaults: backdropClosesModal `false`, showCloseButton `true`

### v0.3.1 / 2016-01-15
* Updated react dependencies
* Better handling of lightbox positioning

### v0.3.0 / 2016-01-06

* Update to use ES6
* Update to use JSS
* Layout refactor:
	- Moved away from CSS transforms for centering
	- Improved responsiveness, performance
* Update example images to Gratisography
* Optional captions below images thanks to [@ko](https://github.com/ko)
* Optional count below images e.g. "3 of 12"
* Move close button top right of frame, and replace with × icon

* * *

### v0.2.1 / 2015-11-29

* Fix bug in examples with `goto` functions

### v0.2.0 / 2015-11-29

* Make the component stateless, now uses functions `onClickPrev`/`onClickNext`

* * *

### v0.1.0 / 2015-11-20

* Support for `srcset` thanks to [@neptunian](https://github.com/neptunian)
