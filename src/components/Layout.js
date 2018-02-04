// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';
import { Button, Div, Img, Span } from './primitives';
import { Close, FullscreenEnter, FullscreenExit } from './svg';
import { type CarouselProps, type CarouselState } from './Carousel';
import { type ModalPropsForCarousel } from './Modal/Modal';

type ElementProps = CarouselProps & CarouselState & ModalPropsForCarousel;

export const Container = ({
  isFullscreen,
  ...props
}: {
  isFullscreen: boolean,
}) => (
  <Div
    css={{
      backgroundColor: isFullscreen ? 'black' : null,
      display: 'flex ',
      flexDirection: 'column',
      // maxHeight: "100%",
      height: '100%',
    }}
    {...props}
  />
);

export const Footer = ({
  activeIndices,
  currentView,
  footerHeight,
  frameProps,
  headerHeight,
  hideControlsWhenIdle,
  in: transitionInProp,
  modalProps,
  mouseIsIdle,
  onExited,
  trackProps,
  views,
  ...props
}: ElementProps) => {
  const index = activeIndices[0];
  const activeView = index + 1;
  const data = views[index];
  const description = data ? data.description : null;
  const totalViews = views.length;

  return (
    <Div
      css={{
        alignItems: 'center',
        color: modalProps ? 'rgba(255, 255, 255, 0.9)' : '#666',
        display: 'flex ',
        flex: '0 0 auto',
        fontSize: 13,
        justifyContent: 'space-between',
        padding: `10px ${modalProps ? 10 : 0}px`,
      }}
      {...props}
    >
      {description ? <Span>{description}</Span> : null}
      {activeView && totalViews ? (
        <Span>
          {activeView} of {totalViews}
        </Span>
      ) : null}
    </Div>
  );
};
export const HeaderButton = (props: any) => (
  <Button
    css={{
      background: 0,
      border: 0,
      color: 'rgba(255, 255, 255, 0.75)',
      cursor: 'pointer',
      outline: 0,
      padding: '0 4px',
      position: 'relative',
      right: -4,

      '&:hover': {
        color: 'white',
      },
    }}
    {...props}
  />
);
export const Header = ({
  activeIndices,
  currentView,
  footerHeight,
  frameProps,
  headerHeight,
  hideControlsWhenIdle,
  in: transitionInProp,
  modalProps,
  mouseIsIdle,
  onExited,
  trackProps,
  views,
  ...props
}: ElementProps) => {
  const allowFullscreen = Boolean(modalProps && modalProps.allowFullscreen);
  const onClose = modalProps ? modalProps.onClose : null;
  const isFullscreen = Boolean(modalProps && modalProps.isFullscreen);
  const toggleFullscreen = modalProps ? modalProps.toggleFullscreen : null;
  const FsIcon = isFullscreen ? FullscreenExit : FullscreenEnter;

  return modalProps ? (
    <Div
      css={{
        alignItems: 'center',
        display: 'flex ',
        flex: '0 0 auto',
        justifyContent: 'space-between',
        opacity: mouseIsIdle ? 0 : 1,
        padding: `10px ${modalProps ? 10 : 0}px`,
        transition: 'opacity 300ms',
      }}
      {...props}
    >
      <span />
      <span>
        {allowFullscreen ? (
          <HeaderButton
            onClick={toggleFullscreen}
            title={
              isFullscreen ? 'Exit fullscreen (f)' : 'Enter fullscreen (f)'
            }
          >
            <FsIcon size={24} />
          </HeaderButton>
        ) : null}
        <HeaderButton onClick={onClose} title="Close (esc)">
          <Close size={24} />
        </HeaderButton>
      </span>
    </Div>
  ) : null;
};

type ViewProps = {
  footerHeight: number,
  headerHeight: number,
};
export const View = ({
  activeIndices,
  currentView,
  footerHeight,
  frameProps,
  headerHeight,
  hideControlsWhenIdle,
  in: transitionInProp,
  modalProps,
  mouseIsIdle,
  onExited,
  trackProps,
  views,
  ...props
}: ElementProps & ViewProps) => {
  const div = {
    padding: `0 ${modalProps ? 10 : 0}px`,
    position: 'relative',
    textAlign: 'center',
  };
  const img = {
    height: 'auto',
    lineHeight: 0,
    maxHeight: `calc(100vh - ${footerHeight + headerHeight}px)`,
    maxWidth: '100%',
    userSelect: 'none',
  };
  const ready = (footerHeight && headerHeight) || !modalProps;

  return ready ? (
    <Div css={div}>
      <Img css={img} {...props} />
    </Div>
  ) : null;
};
