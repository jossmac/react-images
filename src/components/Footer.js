// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';
import { Div, Span } from './primitives';

type State = { modalProps: Object, mouseIsIdle: boolean };
type Props = State & {
  activeIndices: any,
  innerProps: any,
  modalProps: any,
  mouseIsIdle: any,
  views: any,
};

export const footerCSS = ({ modalProps: isModal, mouseIsIdle }: State) => ({
  alignItems: 'center',
  bottom: isModal ? 0 : null,
  color: isModal ? 'rgba(255, 255, 255, 0.9)' : '#666',
  display: 'flex ',
  flex: '0 0 auto',
  fontSize: 13,
  justifyContent: 'space-between',
  left: isModal ? 0 : null,
  opacity: mouseIsIdle ? 0 : 1,
  padding: isModal ? '30px 20px 20px' : '10px 0',
  position: isModal ? 'absolute' : null,
  right: isModal ? 0 : null,
  transform: isModal ? `translateY(${mouseIsIdle ? 10 : 0}px)` : null,
  transition: 'opacity 300ms, transform 300ms',
  zIndex: isModal ? 1 : null,
});

const Footer = (props: Props) => {
  const { activeIndices, getStyles, innerProps, modalProps, views } = props;
  const index = activeIndices[0];
  const activeView = index + 1;
  const data = views[index];
  const description = data ? data.description : null;
  const totalViews = views.length;
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
      {description ? <Span>{description}</Span> : null}
      {/* TODO replace with function for i18n support  */}
      {activeView && totalViews ? (
        <Span>
          {activeView} of {totalViews}
        </Span>
      ) : null}
    </Div>
  );
};

export default Footer;
