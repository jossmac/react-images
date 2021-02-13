import React from 'react'

export const features = [
  {
    icon: '🛠',
    text: 'Static type checking',
    link: (
      <a href="https://flow.org" target="_blank">
        flow
      </a>
    ),
  },
  {
    icon: '📱',
    text: 'Support for touch devices',
    link: (
      <a href="http://souporserious.github.io/react-view-pager" target="_blank">
        react-view-pager
      </a>
    ),
  },
  {
    icon: '📺',
    text: 'Vendor agnostic fullscreen support',
    link: (
      <a href="https://github.com/snakesilk/react-fullscreen" target="_blank">
        react-full-screen
      </a>
    ),
  },
]

export type FeaturesType = typeof features
