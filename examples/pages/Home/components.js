// @flow
// @jsx glam
import glam from 'glam';
import React from 'react';

import type { FeaturesType } from './data';

const smallDevice = '@media (max-width: 769px)';

export const List = ({ items }: FeaturesType) => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {items.map(({ icon, link, text }, j) => (
      <li key={j} style={{ alignItems: 'center', display: 'flex ' }}>
        <span style={{ fontSize: 20, marginRight: '0.5em', width: 20 }}>
          {icon}
        </span>
        <span style={{ fontSize: 14 }}>
          {text}
          {link ? (
            <span>
              {' '}
              &mdash; <strong>{link}</strong>
            </span>
          ) : null}
        </span>
      </li>
    ))}
  </ul>
);

export const Gallery = (props: any) => (
  <div
    css={{
      display: 'flex ',
      flexWrap: 'wrap',
      marginLeft: -2,
      marginRight: -2,
    }}
    {...props}
  />
);

export const Image = (props: any) => (
  <div
    css={{
      backgroundColor: '#eee',
      boxSizing: 'border-box',
      flex: '0 1 calc(25% - 4px)',
      margin: 2,
      overflow: 'hidden',
      paddingBottom: '16%',
      position: 'relative',

      ':hover': {
        opacity: 0.9,
      },
    }}
    {...props}
  />
);

export const Title = () => (
  <h1
    css={{
      alignItems: 'center',
      display: 'flex',
    }}
  >
    <img
      alt="react-images logo"
      src="logo.svg"
      height="22"
      width="39"
      css={{
        marginRight: 10,
        marginTop: 2,
        [smallDevice]: {
          display: 'none',
        },
      }}
    />
    <span>
      React Images v1
      <small css={{ color: '#999', fontWeight: 500 }}> (alpha)</small>
    </span>
  </h1>
);
