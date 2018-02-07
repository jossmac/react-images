# React-Images

### v0.5.17 / 2018-02-07
- fix for "srcSet" inconsistency #204 thanks to [kripod](https://github.com/kripod) and [wmertens](https://github.com/wmertens)
- fix for preload bug when mounted with `isOpen` set to true thanks to [mkalygin](https://github.com/mkalygin)
- removed `react-spinners` dependency which was bloating the bundle, and implemented a simple loading component, thanks [kripod](https://github.com/kripod)
- support for conditional ScrollLock via new property `preventScroll` thanks to [Josh-a-e](https://github.com/Josh-a-e)

### v0.5.16 / 2018-01-30
- add preloadImage call to componentDidMount PR #200 thanks to [ilker0](https://github.com/ilker0)
- Changes some docs to clarify that yarn is the preferred package manager for this project. Removes package-lock.json. PR #191 Thanks to [jorrit](https://github.com/jorrit)
- Unmount the component tree before removing the portal node from DOM PR #180 thanks to  [pleunv](https://github.com/pleunv)
- Fix react warnings by updating react-scrolllock version [jorrit](https://github.com/jorrit))

### v0.5.15 / 2018-01-25
- spinner functionality pull request #187 thanks to [mkalygin](https://github.com/mkalygin)

### v0.5.13 / 2017-11-29
- change srcset to srcSet to fix intermittent warning: Invalid DOM property `srcset`. Did you mean `srcSet`?

### v0.5.12 / 2017-11-29
-  Fix React warning issue #171 thanks to [kachkaev](https://github.com/kachkaev)

### v0.5.10 / 2017-10-18
- New build

### v0.5.8 / 2017-10-06
- Incorrect peer dependency in package.json file

### v0.5.7 / 2017-10-04
- Fix warnings for React 16.0.0 and update dependencies

### v0.5.6 / 2017-09-20
- Update: Let user pass in srcSet as prop in addition to srcset thanks to [smeijer](https://github.com/smeijer)
- Fix: default arrow bg color is none
- Fix: make content div, figure, image respond to theme props #127
- Fix: caption extending and disabling backdropClosesModal click issue #156
- Fix: alignment in safari issue #105

### v0.5.5 / 2017-07-28
- Fix: let user override all possible properties with theme object thanks to [clintharris](https://github.com/clintharris)
- Fix: clicking on image closes lightbox when backdropClosesModal is set to true #152
- Fix: clicking close lightbox button fired onClose handler twice #155

### v0.5.4 / 2017-05-31
- Update: separate out prop-types for React 16 thanks to [hiyamamo](https:github.com/hiyamamo)
- Update: update react-addons-css-transition-group to react-transition-group thanks to [neptunian](https://github.com/neptunian)
- Fix: React warnings in React v15.5.0

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
