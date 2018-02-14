// @flow

import React from 'react';
import { Span } from './primitives';

type Props = { activeView: number, totalViews: number };
export const formatCount = ({ activeView, totalViews }: Props) =>
  activeView && totalViews ? (
    <Span css={{ flexShrink: 0, marginLeft: '1em' }}>
      {activeView} of {totalViews}
    </Span>
  ) : null;
