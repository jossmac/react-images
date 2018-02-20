// @flow
// @jsx glam

import glam from 'glam';
import React from 'react';
import { colors } from '../../../theme';

export const Header = ({ currentView, modalProps }) => {
  const { author, caption } = currentView;
  const { onClose } = modalProps;
  return (
    <div
      css={{
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
        color: colors.N80,
        display: 'flex ',
        flex: '0 0 auto',
        height: 54,
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <div css={{ alignItems: 'center', display: 'flex ' }}>
        <img
          css={{
            borderRadius: 3,
            flexShrink: 0,
            height: 32,
            marginRight: 8,
            width: 32,
          }}
          src={author.avatar}
        />
        <div css={{ fontSize: '0.85em' }}>
          <div css={{ fontWeight: 500 }}>{author.name}</div>
          {caption ? <div>{caption}</div> : null}
        </div>
      </div>
      <div
        css={{
          cursor: 'pointer',
          fontSize: '2em',
          paddingLeft: 4,
          paddingRight: 4,
        }}
        onClick={onClose}
        role="button"
      >
        &times;
      </div>
    </div>
  );
};
