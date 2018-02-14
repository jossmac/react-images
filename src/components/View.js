// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';
import { Div, Img } from '../primitives';
import { type PropsWithStyles } from '../types';

type Props = PropsWithStyles & { data: Object, isFullscreen: boolean };

export const viewCSS = () => ({
  lineHeight: 0,
  position: 'relative',
  textAlign: 'center',
});

const View = (props: Props) => {
  const { data, isFullscreen, getStyles } = props;
  const img = {
    height: 'auto',
    maxHeight: '100vh',
    maxWidth: '100%',
    userSelect: 'none',
  };
  const src = isFullscreen ? data.urls.full : data.urls.regular;

  return (
    <Div css={getStyles('view', props)}>
      <Img
        css={img}
        src={src}
        alt={data.description || `by ${data.photographer}`}
      />
    </Div>
  );
};

export default View;
