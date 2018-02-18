import React from 'react';

export const features = [
  {
    icon: '🛠',
    text: 'Comprehensively typed',
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
    text: 'HTML5 fullscreen support',
    link: (
      <a href="https://github.com/snakesilk/react-fullscreen" target="_blank">
        react-full-screen
      </a>
    ),
  },
  { icon: '🖼', text: 'Carousel without modal dialog' },
  { icon: '🎨', text: 'Lightweight styling framework' },
  { icon: '🏖', text: 'No restrictions on data shape' },
  { icon: '🚀', text: 'Replaceable component architecture' },
];

export type FeaturesType = typeof features;
