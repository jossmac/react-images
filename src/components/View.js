// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';
import { Div, Img } from '../primitives';

type Props = { data: Object };

export const viewCSS = () => ({
  position: 'relative',
  textAlign: 'center',
});

const View = (props: Props) => {
  const { data, getStyles } = props;
  const img = {
    height: 'auto',
    lineHeight: 0,
    maxHeight: '100vh',
    maxWidth: '100%',
    userSelect: 'none',
  };

  return (
    <Div css={getStyles('view', props)}>
      <Img css={img} src={data.src} alt={data.description} />
    </Div>
  );
};

export default View;
