// @flow
// @jsx glam
import glam from 'glam';
import React, { Component } from 'react';

type Props = {
  active?: boolean,
  index?: number,
  onClick: func.isRequired,
  src?: string,
  thumbnail?: string,
};

export default class Thumbnail extends Component<Props> {
  handleClick = event => {
    const { index, onClick } = this.props;

    event.preventDefault();
    event.stopPropagation();

    onClick(index);
  };
  render() {
    const { active, src, thumbnail } = this.props;
    const url = thumbnail ? thumbnail : src;

    return (
      <div
        className={css(classes.thumbnail, active && classes.thumbnail__active)}
        onClick={this.handleClick}
        style={{ backgroundImage: 'url("' + url + '")' }}
      />
    );
  }
}

export const thumbnailCSS = ({ isActive }) => ({
  thumbnail: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 2,
    boxShadow: isActive
      ? `inset 0 0 0 2px ${defaults.thumbnail.activeBorderColor}`
      : 'inset 0 0 0 1px hsla(0,0%,100%,.2)',
    cursor: 'pointer',
    display: 'inline-block',
    height: defaults.thumbnail.size,
    margin: defaults.thumbnail.gutter,
    overflow: 'hidden',
    width: defaults.thumbnail.size,
  },
});
