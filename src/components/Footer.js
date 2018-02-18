// @flow
// @jsx glam
import glam from 'glam';
import React from 'react';

import { smallDevice } from './helpers';
import { A, Div, Span } from '../primitives';
import type { PropsWithStyles, ViewType } from '../types';
import { className } from '../utils';

type State = { isModal: boolean, mouseIsIdle: boolean };
type Props = State &
  PropsWithStyles & {
    components: Object,
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

  [smallDevice]: {
    padding: isModal ? '20px 15px 15px' : '5px 0',
  },
});

const Footer = (props: Props) => {
  const { components, getStyles, innerProps, isFullscreen, isModal } = props;

  const style = isModal
    ? { background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.33))' }
    : null;

  const state = { isFullscreen, isModal };
  const cn = {
    container: className('footer', state),
    caption: className('footer__caption', state),
    count: className('footer__count', state),
  };
  const css = {
    container: getStyles('footer', props),
    caption: getStyles('footerCaption', props),
    count: getStyles('footerCount', props),
  };
  const { Caption, Count } = components;

  return (
    <Div
      css={css.container}
      className={cn.container}
      // TODO glam prefixer fails on gradients
      // https://github.com/threepointone/glam/issues/35
      style={style}
      {...innerProps}
    >
      <Caption css={css.caption} className={cn.caption} {...props} />
      <Count css={css.count} className={cn.count} {...props} />
    </Div>
  );
};

// ==============================
// Inner Elements
// ==============================

const Anchor = ({ isModal, ...props }) => (
  <A
    css={{
      color: isModal ? 'white' : 'inherit',
      textDecoration: 'none',

      ':hover': { textDecoration: 'underline' },
    }}
    {...props}
  />
);

function photoUrl(username) {
  const id = 'react-images';
  return `https://unsplash.com/${username}?utm_source=${id}&utm_medium=referral`;
}

export const footerCaptionCSS = () => ({});

export const FooterCaption = (props: ViewType) => {
  const { data, getStyles, isModal } = props;
  const { caption, photographer, username } = data;
  return (
    <Span css={getStyles('footerCaption', props)}>
      {photographer && username ? (
        <strong>
          <Anchor href={photoUrl(username)} target="_blank" isModal={isModal}>
            {photographer}{' '}
          </Anchor>
        </strong>
      ) : null}
      {caption}
    </Span>
  );
};

export const footerCountCSS = () => ({ flexShrink: 0, marginLeft: '1em' });

export const FooterCount = (props: ViewType) => {
  const { activeIndices, getStyles, views } = props;
  const activeView = activeIndices[0] + 1;
  const totalViews = views.length;

  if (!activeView || !totalViews) return null;

  return (
    <Span css={getStyles('footerCount', props)}>
      {activeView} of {totalViews}
    </Span>
  );
};

export default Footer;
