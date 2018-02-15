// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';

import { Div, Img } from '../primitives';
import { type PropsWithStyles } from '../types';
import { className } from '../utils';

type Props = PropsWithStyles & {
  data: Object,
  isFullscreen: boolean,
  isModal: boolean,
};

export const viewCSS = () => ({
  lineHeight: 0,
  position: 'relative',
  textAlign: 'center',
});

const imageCSS = {
  height: 'auto',
  maxHeight: '100vh',
  maxWidth: '100%',
  userSelect: 'none',
};

const View = (props: Props) => {
  const { data, isFullscreen, isModal, getStyles } = props;
  const src = isFullscreen ? data.urls.full : data.urls.regular;

  return (
    <Div
      css={getStyles('view', props)}
      className={className('view', { isFullscreen, isModal })}
    >
      <Img
        css={imageCSS}
        className={className('view-image', { isFullscreen, isModal })}
        src={src}
        alt={data.description || `by ${data.photographer}`}
      />
    </Div>
  );
};

export default View;
