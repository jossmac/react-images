// @flow
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const viewPagerUrl = 'https://github.com/souporserious/react-view-pager'

export const carouselProps = [
  {
    defaultValue: null,
    description: (
      <p>
        Replace any or all of the carousel components with your own to create the layout and functionality you desire. Detailed documentation on the{' '}
        <Link to="/components">Components page</Link>.
      </p>
    ),
    isRequired: false,
    name: 'components',
    type: 'Object<ComponentType>',
    typeDefinition: `// FrameProps, ModalProps, StyleFn, TrackProps, and ViewType declared below

type CommonProps = {
  carouselProps: Object,
  currentIndex: number,
  currentView: ViewType,
  frameProps FrameProps,
  getStyles: StyleFn,
  innerProps: Object,
  isFullscreen: boolean,
  isModal: boolean,
  modalProps: ModalProps,
  interactionIsIdle: boolean,
  trackProps: TrackProps,
  views: Array<ViewType>,
}

type components = {
  Container: ComponentType<CommonProps>,
  Footer: ComponentType<CommonProps>,
  FooterCaption: ComponentType<CommonProps>,
  FooterCount: ComponentType<CommonProps>,
  Header: ComponentType<CommonProps>,
  HeaderClose: ComponentType<CommonProps>,
  HeaderFullscreen: ComponentType<CommonProps>,
  Navigation: ComponentType<CommonProps>,
  NavigationPrev: ComponentType<CommonProps>,
  NavigationNext: ComponentType<CommonProps>,
  View: ComponentType<CommonProps>,
}`,
  },
  {
    defaultValue: '0',
    description:
      'React-Images manages the index state internally. This property is exposed so you can take control of it, or initiate the carousel from a certain point.',
    isRequired: false,
    name: 'currentIndex',
    type: 'Number',
  },
  {
    defaultValue: null,
    description: (
      <p>
        Passed on to react-view-pager's Frame component. Check out{' '}
        <a href={`${viewPagerUrl}#frame-props`} target="_blank">
          #frame-props
        </a>{' '}
        for more information.
      </p>
    ),
    isRequired: false,
    name: 'frameProps',
    type: 'Object',
    typeDefinition: `{
  accessibility: boolean,
  autoSize: true | false | 'width' | 'height',
  springConfig: { [key: string]: number },
  tag: string,
}`,
  },
  {
    description:
      'Formatters get called with common props to render labels and titles for certain components. Replace the default formatters if you want to tweak the text or change the language.',
    isRequired: false,
    name: 'formatters',
    type: 'Object<Function>',
    typeDefinition: `// CommonProps declared above in the \`component\` prop type

{
  getAltText: (CommonProps) => string, // {caption} | Image {currentIndex}
  getNextLabel: (CommonProps) => string, // Show slide {nextIndex} of {totalCount}
  getPrevLabel: (CommonProps) => string, // Show slide {prevIndex} of {totalCount}
  getNextTitle: (CommonProps) => string, // Next (right arrow)
  getPrevTitle: (CommonProps) => string, // Previous (left arrow)
  getCloseLabel: (CommonProps) => string, // Close (esc)
  getFullscreenLabel: (CommonProps) => string, // [Enter | Exit] fullscreen (f)
}`,
  },
  {
    defaultValue: '3000',
    description: 'The duration, in milliseconds, to wait before hiding controls when the user is idle.',
    isRequired: false,
    name: 'hideControlsWhenIdle',
    type: 'Number | false',
  },
  {
    defaultValue: null,
    description: 'Available when the Carousel is within a Modal. The applicable props are cloned and passed on for use inside Carousel components.',
    isRequired: false,
    name: 'modalProps',
    type: 'Object',
    typeDefinition: `{
  allowFullscreen: boolean,
  isFullscreen: boolean,
  onClose: (SyntheticEvent) => void,
  preventScroll: boolean,
  toggleFullscreen: () => void,
}`,
  },
  {
    defaultValue: 'false',
    description: 'Whether image carousel navigation buttons should be hidden or shown on touch-enabled devices. (Default: hidden)',
    isRequired: false,
    name: 'showNavigationOnTouchDevice',
    type: 'boolean',
  },
  {
    defaultValue: null,
    description: 'React-Images ships each Carousel component with default styles. You can extend or replace these using the styles property.',
    isRequired: false,
    name: 'styles',
    type: 'Object<Function>',
    typeDefinition: `type StyleObj = { [key: string]: any }
type State = {
  isFullscreen: boolean,
  isModal: boolean,
  interactionIsIdle: boolean,
}

type StyleFn = (StyleObj, State) => StyleObj

{
  container: StyleFn,
  footer: StyleFn,
  footerCaption: StyleFn,
  footerCount: StyleFn,
  header: StyleFn,
  headerClose: StyleFn,
  headerFullscreen: StyleFn,
  navigation: StyleFn,
  navigationPrev: StyleFn,
  navigationNext: StyleFn,
  view: StyleFn,
}`,
  },
  {
    defaultValue: "{ swipe: 'touch' }",
    description: (
      <p>
        Passed on to react-view-pager's Track component. Check out{' '}
        <a href={`${viewPagerUrl}#track-props`} target="_blank">
          #track-props
        </a>{' '}
        for more information.
      </p>
    ),
    isRequired: false,
    name: 'trackProps',
    type: 'Object',
    typeDefinition: `{
  align: number,
  animations: Array<{ props: string, stops: Array<[number, number]> }>,
  axis: 'x' | 'y',
  contain: boolean,
  currentView: any,
  flickTimeout: number,
  infinite: boolean,
  instant: boolean,
  onRest: () => void,
  onScroll: () => void,
  onSwipeEnd: () => void,
  onSwipeMove: () => void,
  onSwipeStart: () => void,
  onViewChange: number => void,
  springConfig: { [key: string]: number },
  swipe: true | false | 'mouse' | 'touch',
  swipeThreshold: number,
  tag: any,
  viewsToMove: number,
  viewsToShow: number | 'auto',
}`,
  },
  {
    defaultValue: null,
    description: (
      <Fragment>
        <p>
          The data shape for each view in your carousel. This must be an array of objects, though the key/value pairs in the objects can be whatever you want.
        </p>
        <p>When using "non-standard" view data you must provide a View component that can interpret and render it.</p>
      </Fragment>
    ),
    isRequired: true,
    name: 'views',
    type: 'Array<Object>',
    typeDefinition: `// the default View component expects

Array<{
  caption?: string | Node,
  source: string | {
    download?: string,
    fullscreen?: string,
    regular: string,
    thumbnail?: string,
  },
}>`,
  },
]

export const modalProps = [
  {
    defaultValue: 'true',
    description: 'Whether the user should be allowed to fullscreen the dialog, either by clicking the Fullscreen button or from an `F` keypress.',
    name: 'allowFullscreen',
    type: 'Boolean',
  },
  {
    description: 'Modal expects a single Carousel child. It will not behave as expected otherwise.',
    name: 'children',
    type: 'CarouselType',
    isRequired: true,
  },
  {
    defaultValue: 'true',
    description: 'Whether the `onClose` function should be called when the backdrop is clicked.',
    name: 'closeOnBackdropClick',
    type: 'Boolean',
  },
  {
    defaultValue: 'true',
    description: 'Whether the `onClose` function should be called when the `esc` key is pressed',
    name: 'closeOnEsc',
    type: 'Boolean',
  },
  {
    description: 'Function called to request close of the modal',
    isRequired: true,
    name: 'onClose',
    type: 'Function',
    typeDefinition: '(Event) => void',
  },
  {
    description: 'React-Images ships each Modal component with default styles. You can extend or replace these using the styles property.',
    name: 'styles',
    type: 'Object<Function>',
    typeDefinition: `type StyleObj = { [key: string]: any }
type State = { isFullscreen: boolean }

type StyleFn = (StyleObj, State) => StyleObj

{
  blanket: StyleFn,
  dialog: StyleFn,
  positioner: StyleFn,
}`,
  },
  {
    defaultValue: 'true',
    description: (
      <p>
        Determines whether scrolling is prevented via{' '}
        <a href="https://github.com/jossmac/react-scrolllock" target="_blank">
          react-scrolllock
        </a>
        .
      </p>
    ),
    name: 'preventScroll',
    type: 'Boolean',
  },
]
