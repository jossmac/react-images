// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';
import { Button, Div } from '../primitives';
import { className } from '../utils';
import { Close, FullscreenEnter, FullscreenExit } from './svg';

type State = { mouseIsIdle: boolean };
type Props = State & {
  getStyles: any,
  innerProps: any,
  modalProps: any,
};

export const headerCSS = ({ mouseIsIdle }: State) => ({
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
});

const Header = (props: Props) => {
  const { getStyles, innerProps, modalProps } = props;
  const {
    allowFullscreen,
    isFullscreen,
    onClose,
    toggleFullscreen,
  } = modalProps;
  const FsIcon = isFullscreen ? FullscreenExit : FullscreenEnter;

  return (
    <Div
      css={getStyles('header', props)}
      className={className('header', {
        isFullscreen,
        isModal: Boolean(modalProps),
      })}
      // TODO glam prefixer fails on gradients
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

export default Header;
