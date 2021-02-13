// @flow
// @jsx glam
import glam from 'glam'
import React from 'react'

type IconProps = { size: number, type: 'play' | 'pause' }
const Icon = ({ size = 64, type }: IconProps) => {
  const get = {
    play: (
      <path d="M12 20.016c4.406 0 8.016-3.609 8.016-8.016s-3.609-8.016-8.016-8.016-8.016 3.609-8.016 8.016 3.609 8.016 8.016 8.016zM12 2.016c5.531 0 9.984 4.453 9.984 9.984s-4.453 9.984-9.984 9.984-9.984-4.453-9.984-9.984 4.453-9.984 9.984-9.984zM9.984 16.5v-9l6 4.5z" />
    ),
    pause: (
      <path d="M12.984 15.984v-7.969h2.016v7.969h-2.016zM12 20.016c4.406 0 8.016-3.609 8.016-8.016s-3.609-8.016-8.016-8.016-8.016 3.609-8.016 8.016 3.609 8.016 8.016 8.016zM12 2.016c5.531 0 9.984 4.453 9.984 9.984s-4.453 9.984-9.984 9.984-9.984-4.453-9.984-9.984 4.453-9.984 9.984-9.984zM9 15.984v-7.969h2.016v7.969h-2.016z" />
    ),
  }

  return (
    <svg
      role="presentation"
      viewBox="0 0 24 24"
      css={{
        display: 'inline-block',
        fill: 'currentColor',
        height: size,
        stroke: 'currentColor',
        strokeWidth: 0,
        width: size,
      }}
    >
      {get[type]}
    </svg>
  )
}

export default Icon
