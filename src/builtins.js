// @flow

import React, { type Node } from 'react';
import { A, Span } from './primitives';
import { type ViewType } from './types';

const Anchor = props => (
  <A
    css={{
      color: 'white',
      textDecoration: 'none',

      ':hover': { textDecoration: 'underline' },
    }}
    {...props}
  />
);

function photoUrl(username) {
  const id = 'react-images';
  return `https://unsplash.com/${username}?utm_source=${id}&utm_medium=referral`;
}

export const formatCaption = ({
  description,
  photographer,
  username,
}: ViewType): Node => (
  <Span>
    {photographer && username ? (
      <strong>
        <Anchor href={photoUrl(username)} target="_blank">
          {photographer}{' '}
        </Anchor>
      </strong>
    ) : null}
    {description}
  </Span>
);

export const formatCount = ({ activeIndices, views }: ViewType): Node => {
  const activeView = activeIndices[0] + 1;
  const totalViews = views.length;

  if (!activeView || !totalViews) return null;

  return (
    <Span css={{ flexShrink: 0, marginLeft: '1em' }}>
      {activeView} of {totalViews}
    </Span>
  );
};
