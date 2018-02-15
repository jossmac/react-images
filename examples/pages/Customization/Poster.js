// @flow
// @jsx glam
import glam from 'glam';
import React from 'react';

import Icon from './Icon';
import type { ViewShape } from './View';

type Props = { data: ViewShape, onClick: any => void };

const Poster = ({ data, onClick }: Props) => (
  <div
    css={{
      background: '#eee',
      lineHeight: 0,
      marginBottom: '1em',
      position: 'relative',
    }}
  >
    <img src={data.poster} css={{ maxWidth: '100%' }} />
    <button
      onClick={onClick}
      css={{
        background: 0,
        border: 0,
        color: 'white',
        cursor: 'pointer',
        padding: 0,
        height: 64,
        left: '50%',
        marginLeft: -32,
        marginTop: -32,
        opacity: 0.66,
        outline: 0,
        position: 'absolute',
        top: '50%',
        transition: 'opacity 200ms',
        width: 64,

        ':hover': { opacity: 1 },
      }}
    >
      <Icon type="play" />
    </button>
  </div>
);

export default Poster;
