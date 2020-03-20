// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';

import { Div, Img } from '../primitives';
import { type PropsWithStyles } from '../types';
import { className } from '../utils';
import { getSource } from './component-helpers';

type Props = PropsWithStyles & {
  data: Object,
  isFullscreen: boolean,
  isModal: boolean,
};

export const viewCSS = () => ({
  lineHeight: 0,
  position: 'relative',
  textAlign: 'center',
});

/**
 * Used to get the className to select the view in other components.
 * This className is we call `className()` in utils with to get the full
 * className.
 */
export const viewBaseClassName = 'view';

const View = (props: Props) => {
  const { data, formatters, getStyles, index, isFullscreen, isModal } = props;
  const innerProps = {
    alt: formatters.getAltText({ data, index }),
    src: getSource({ data, isFullscreen }),
  };

  return (
    <Div
      css={getStyles(viewBaseClassName, props)}
      className={className(viewBaseClassName, { isFullscreen, isModal })}
    >
      <Img
        {...innerProps}
        className={className('view-image', { isFullscreen, isModal })}
        css={{
          height: 'auto',
          maxHeight: '100vh',
          maxWidth: '100vw',
          userSelect: 'none',
        }}
      />
    </Div>
  );
};

export default View;
