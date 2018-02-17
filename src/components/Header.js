// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';

import { Button as Btn, Div } from '../primitives';
import { className } from '../utils';
import type { PropsWithStyles } from '../types';
import { Close, FullscreenEnter, FullscreenExit } from './svg';

type State = { mouseIsIdle: boolean };
type Props = PropsWithStyles &
  State & {
    components: Object,
    innerProps: Object,
    isModal: boolean,
    modalProps: Object,
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
  const { components, getStyles, innerProps, isModal, modalProps } = props;

  if (!isModal) return null;

  const {
    allowFullscreen,
    isFullscreen,
    onClose,
    toggleFullscreen,
  } = modalProps;
  const FsIcon = isFullscreen ? FullscreenExit : FullscreenEnter;
  const { Button } = components;

  return (
    <Div
      css={getStyles('header', props)}
      className={className('header', { isFullscreen, isModal })}
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
          <Button
            getStyles={getStyles}
            innerProps={{
              onClick: toggleFullscreen,
              title: isFullscreen
                ? 'Exit fullscreen (f)'
                : 'Enter fullscreen (f)',
            }}
          >
            <FsIcon size={32} />
          </Button>
        ) : null}
        <Button
          getStyles={getStyles}
          innerProps={{
            onClick: onClose,
            title: 'Close (esc)',
          }}
        >
          <Close size={32} />
        </Button>
      </span>
    </Div>
  );
};

export const headerButtonCSS = () => ({
  alignItems: 'center',
  background: 0,
  border: 0,
  color: 'rgba(255, 255, 255, 0.75)',
  cursor: 'pointer',
  display: 'inline-flex ',
  height: 44,
  justifyContent: 'center',
  outline: 0,
  padding: 0,
  position: 'relative',
  width: 44,

  '&:hover': {
    color: 'white',
  },
});

export const HeaderButton = (props: any) => {
  const { children, getStyles, innerProps } = props;
  return (
    <Btn css={getStyles('headerButton', props)} {...innerProps}>
      {children}
    </Btn>
  );
};

export default Header;
