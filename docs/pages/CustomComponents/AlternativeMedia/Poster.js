// @flow
// @jsx glam
import glam from 'glam'
import React from 'react'

import Icon from './Icon'
import type { ViewShape } from './View'

type Props = { data: ViewShape, onClick: any => void }

const ratio = `${((9 / 16) * 100) / 2}%`
const gutter = 2

export const Posters = (props: any) => (
  <div
    css={{
      marginLeft: -gutter,
      marginRight: -gutter,
      overflow: 'hidden',
    }}
    {...props}
  />
)

export const Poster = ({ data, onClick }: Props) => (
  <div
    role="img"
    css={{
      backgroundColor: '#eee',
      backgroundImage: `url(${data.poster})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      boxSizing: 'border-box',
      float: 'left',
      lineHeight: 0,
      margin: gutter,
      overflow: 'hidden',
      paddingBottom: ratio,
      position: 'relative',
      width: `calc(50% - ${gutter * 2}px)`,
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
)
