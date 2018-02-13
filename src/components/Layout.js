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
  children,
  isFullscreen,
  innerProps,
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
    {...innerProps}
  >
    {children}
  </Div>
);

// ==============================
// HEADER
// ==============================

export const Header = ({
  innerProps,
  modalProps,
  mouseIsIdle,
}: ElementProps) => {
  const {
    allowFullscreen,
    isFullscreen,
    onClose,
    toggleFullscreen,
  } = modalProps;
  const FsIcon = isFullscreen ? FullscreenExit : FullscreenEnter;

  return (
    <Div
      css={{
        alignItems: 'center',
        display: 'flex ',
        flex: '0 0 auto',
        justifyContent: 'space-between',
        opacity: mouseIsIdle ? 0 : 1,
        padding: 10,
        paddingBottom: 20,
        position: 'absolute',
        transform: `translateY(${mouseIsIdle ? -10 : 0}px)`,
        transition: 'opacity 300ms, transform 300ms',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
      // glam prefixer fails on gradients
      // https://github.com/threepointone/glam/issues/35
      style={{
        background: 'linear-gradient(rgba(0,0,0,0.33), rgba(0,0,0,0))',
      }}
      {...innerProps}
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
            <FsIcon size={32} />
          </HeaderButton>
        ) : null}
        <HeaderButton onClick={onClose} title="Close (esc)">
          <Close size={32} />
        </HeaderButton>
      </span>
    </Div>
  );
};
export const HeaderButton = (props: any) => (
  <Button
    css={{
      alignItems: 'center',
      background: 0,
      border: 0,
      color: 'rgba(255, 255, 255, 0.75)',
      cursor: 'pointer',
      display: 'inline-flex ',
      height: 48,
      justifyContent: 'center',
      outline: 0,
      padding: 0,
      position: 'relative',
      width: 44,

      '&:hover': {
        color: 'white',
      },
    }}
    {...props}
  />
);

// ==============================
// FOOTER
// ==============================

export const Footer = ({
  activeIndices,
  innerProps,
  modalProps,
  mouseIsIdle,
  views,
}: ElementProps) => {
  const index = activeIndices[0];
  const activeView = index + 1;
  const data = views[index];
  const description = data ? data.description : null;
  const totalViews = views.length;
  const isModal = Boolean(modalProps);

  const modalCSS = isModal
    ? {
        bottom: 0,
        color: 'rgba(255, 255, 255, 0.9)',
        left: 0,
        padding: 20,
        paddingTop: 30,
        position: 'absolute',
        right: 0,
        zIndex: 1,
      }
    : null;

  return (
    <Div
      css={{
        alignItems: 'center',
        color: '#666',
        display: 'flex ',
        flex: '0 0 auto',
        fontSize: 13,
        justifyContent: 'space-between',
        opacity: mouseIsIdle ? 0 : 1,
        padding: '10px 0',
        transform: `translateY(${mouseIsIdle ? 10 : 0}px)`,
        transition: 'opacity 300ms, transform 300ms',
        ...modalCSS,
      }}
      // glam prefixer fails on gradients
      // https://github.com/threepointone/glam/issues/35
      style={
        isModal
          ? {
              background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.33))',
            }
          : null
      }
      {...innerProps}
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

// ==============================
// VIEW
// ==============================

type ViewProps = {
  data: Object,
  footerHeight: number,
  headerHeight: number,
};
export const View = ({
  data,
  footerHeight,
  headerHeight,
  modalProps,
}: ElementProps & ViewProps) => {
  const div = {
    position: 'relative',
    textAlign: 'center',
  };
  const img = {
    height: 'auto',
    lineHeight: 0,
    maxHeight: '100vh',
    maxWidth: '100%',
    userSelect: 'none',
  };
  const ready = (footerHeight && headerHeight) || !modalProps;

  return ready ? (
    <Div css={div}>
      <Img css={img} src={data.src} />
    </Div>
  ) : null;
};
