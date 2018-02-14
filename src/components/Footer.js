// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';
import { Div, Span } from '../primitives';
import { type PropsWithStyles } from '../types';
import { className } from '../utils';

type State = { isModal: boolean, mouseIsIdle: boolean };
type Props = State &
  PropsWithStyles & {
    activeIndices: any,
    count: any,
    data: any,
    innerProps: any,
    isFullscreen: boolean,
    isModal: boolean,
    modalProps: any,
    mouseIsIdle: any,
    views: any,
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

const Anchor = p => (
  <a
    css={{
      color: 'inherit',
      textDecoration: 'none',
      ':hover': {
        textDecoration: 'underline',
      },
    }}
    {...p}
  />
);

function photoUrl(username) {
  const id = 'react-images';
  return `https://unsplash.com/${username}?utm_source=${id}&utm_medium=referral`;
}

const Footer = (props: Props) => {
  const { count, data, getStyles, innerProps, isFullscreen, isModal } = props;
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
      <Span>
        <strong>
          <Anchor href={photoUrl(data.username)} target="_blank">
            {data.photographer}{' '}
          </Anchor>
        </strong>
        {data.description}
      </Span>
      {count}
    </Div>
  );
};

export default Footer;
