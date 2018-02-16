// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';
import { Div } from '../primitives';
import { type PropsWithStyles } from '../types';
import { className } from '../utils';
import { formatCaption as fCap, formatCount as fCnt } from '../builtins';

type State = { isModal: boolean, mouseIsIdle: boolean };
type Props = State &
  PropsWithStyles & {
    formatCaption: typeof fCap,
    formatCount: typeof fCnt,
    data: any,
    innerProps: any,
    isFullscreen: boolean,
    isModal: boolean,
    modalProps: any,
    mouseIsIdle: any,
  };

export const footerCSS = ({ isModal, mouseIsIdle }: State) => ({
  alignItems: 'top',
  bottom: isModal ? 0 : null,
  color: isModal ? 'rgba(255, 255, 255, 0.9)' : '#666',
  display: 'flex ',
  flex: '0 0 auto',
  fontSize: 13,
  justifyContent: 'space-between',
  left: isModal ? 0 : null,
  opacity: mouseIsIdle && isModal ? 0 : 1,
  padding: isModal ? '30px 20px 20px' : '10px 0',
  position: isModal ? 'absolute' : null,
  right: isModal ? 0 : null,
  transform: isModal ? `translateY(${mouseIsIdle ? 10 : 0}px)` : null,
  transition: 'opacity 300ms, transform 300ms',
  zIndex: isModal ? 1 : null,
});

const Footer = (props: Props) => {
  const {
    data,
    formatCaption,
    formatCount,
    getStyles,
    innerProps,
    isFullscreen,
    isModal,
  } = props;
  const style = isModal
    ? { background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.33))' }
    : null;

  return (
    <Div
      css={getStyles('footer', props)}
      className={className('footer', { isFullscreen, isModal })}
      // TODO glam prefixer fails on gradients
      // https://github.com/threepointone/glam/issues/35
      style={style}
      {...innerProps}
    >
      {formatCaption && formatCaption({ data, isFullscreen, isModal })}
      {formatCount && formatCount(props)}
    </Div>
  );
};

export default Footer;
