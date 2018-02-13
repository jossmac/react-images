// @flow

import React from 'react';
import { Span } from './primitives';

export const formatCount = ({ activeView, totalViews }) =>
  activeView && totalViews ? (
    <Span>
      {activeView} of {totalViews}
    </Span>
  ) : null;
