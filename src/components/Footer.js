// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';
import { Div, Span } from '../primitives';
import { type PropsWithStyles } from '../types';

type State = { modalProps: Object, mouseIsIdle: boolean };
type Props = State &
  PropsWithStyles & {
    activeIndices: any,
    count: any,
    data: any,
    innerProps: any,
    modalProps: any,
    mouseIsIdle: any,
    views: any,
  };

export const footerCSS = ({ modalProps: isModal, mouseIsIdle }: State) => ({
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

const app_name = 'react-images';

const Footer = (props: Props) => {
  const { count, data, getStyles, innerProps, modalProps } = props;
  const unsplashUser = `https://unsplash.com/${
    data.username
  }?utm_source=${app_name}&utm_medium=referral`;
  const style = modalProps
    ? { background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.33))' }
    : null;

  return (
    <Div
      css={getStyles('footer', props)}
      // TODO glam prefixer fails on gradients
      // https://github.com/threepointone/glam/issues/35
      style={style}
      {...innerProps}
    >
      <Span>
        <strong>
          <Anchor href={unsplashUser} target="_blank">
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
