// @flow
// @jsx glam
import glam from 'glam';
import React from 'react';

import Icon from './Icon';
import type { ViewShape } from './View';

type Props = { data: ViewShape, onClick: any => void };

const ratio = `${9 / 16 * 100 / 2}%`;
const gutter = 2;

export const Posters = (props: any) => (
  <div
    css={{
      display: 'flex ',
      marginLeft: -gutter,
      marginRight: -gutter,
    }}
    {...props}
  />
);

export const Poster = ({ data, onClick }: Props) => (
  <div
    role="img"
    css={{
      backgroundColor: '#eee',
      backgroundImage: `url(${data.poster})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      flex: 1,
      lineHeight: 0,
      margin: gutter,
      paddingBottom: ratio,
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    <button
      onClick={onClick}
      type="button"
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
