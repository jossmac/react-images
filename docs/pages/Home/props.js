import React from 'react';

export const carouselProps = [
  {
    defaultValue: null,
    description: 'Replace any of the carousel components with your own.',
    isRequired: false,
    name: 'components',
    type: 'object',
    // typeDefinition: any,
  },
  {
    defaultValue: '0',
    description: "Take control of the carousel's view index state.",
    isRequired: false,
    name: 'currentIndex',
    type: 'number',
    // typeDefinition: any,
  },
  {
    defaultValue: null,
    description:
      'See https://github.com/souporserious/react-view-pager#frame-props',
    isRequired: false,
    name: 'frameProps',
    type: 'object',
    typeDefinition: {
      accessibility: Boolean,
      autoSize: true | false | 'width' | 'height',
      springConfig: Object, // TODO
      tag: String,
    },
  },
  {
    description:
      'Formatters get called when language is used, defaults use english.',
    isRequired: false,
    name: 'formatters',
    type: 'object',
    typeDefinition: {
      getNextLabel: Function,
      getPrevLabel: Function,
      getNextTitle: Function,
      getPrevTitle: Function,
      getCloseLabel: Function,
      getFullscreenLabel: Function,
    },
  },
  {
    defaultValue: 'true',
    description:
      'Hide controls when the user is idle (listens to mouse/touch move).',
    isRequired: false,
    name: 'hideControlsWhenIdle',
    type: 'boolean',
  },
  {
    defaultValue: null,
    description:
      'When envoked within a modal, props are cloned from the modal.',
    isRequired: false,
    name: 'modalProps',
    type: 'object',
    typeDefinition: {
      allowFullscreen: Boolean,
      isFullscreen: Boolean,
      onClose: Function,
      toggleFullscreen: Function,
    },
  },
  {
    defaultValue: null,
    description: 'Modify the style of any component.',
    isRequired: false,
    name: 'styles',
    type: 'object',
    typeDefinition: {
      container: Function,
      footer: Function,
      footerCaption: Function,
      footerCount: Function,
      header: Function,
      headerClose: Function,
      headerFullscreen: Function,
      navigation: Function,
      navigationPrev: Function,
      navigationNext: Function,
      view: Function,

      blanket: Function,
      dialog: Function,
      positioner: Function,
    },
  },
  {
    defaultValue: "{ swipe: 'touch' }",
    description: (
      <p>
        See{' '}
        <a
          href="https://github.com/souporserious/react-view-pager#track-props"
          target="_blank"
        >
          react-view-pager#track-props
        </a>
      </p>
    ),
    isRequired: false,
    name: 'trackProps',
    type: 'object',
    typeDefinition: {
      align: Number,
      animations: [{ props: String, stops: Array[(Number, Number)] }],
      axis: 'x, y',
      contain: Boolean,
      currentView: Number,
      flickTimeout: Number,
      infinite: Boolean,
      instant: Boolean,
      onRest: Function,
      onScroll: Function,
      onSwipeEnd: Function,
      onSwipeMove: Function,
      onSwipeStart: Function,
      onViewChange: Function,
      springConfig: Object,
      swipe: true | false | 'mouse' | 'touch',
      swipeThreshold: Number,
      tag: String,
      viewsToMove: Number,
      viewsToShow: Number | 'auto',
    },
  },
  {
    defaultValue: null,
    description: 'The items to render in the carousel.',
    isRequired: true,
    name: 'views',
    type: 'array',
    // typeDefinition: [{ [key: string]: any }], // TODO
  },
];
