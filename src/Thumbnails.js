import React from 'react'
import { css, StyleSheet } from 'aphrodite/no-important';

import theme from './theme';

const classes = StyleSheet.create({
	thumbnail: {
    display: 'inline-block',
    margin: 2,
    overflow: 'hidden',
    borderRadius: 2,
    cursor: 'pointer',
    width: theme.thumbnails.size, 
    height: theme.thumbnails.size,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    boxShadow: 'inset 0 0 0 1px hsla(0,0%,100%,.2)'
	},
  active: {
    boxShadow: 'inset 0 0 0 2px #fff'
  },

	thumbnails: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 72,
    color: 'white',
    overflowX: 'scroll',
    textAlign: 'center',
    whiteSpace: 'nowrap'
	},
});

class Thumbnail extends React.Component {
  render(){
    const { index, src, srcset, thumbnail, active, onClickThumbnail } = this.props

    const size = 64
    const url = thumbnail ? thumbnail : src
    return (
      <div className={css(classes.thumbnail, active && classes.active)}
           onClick={() => onClickThumbnail(index)}
           style={{ backgroundImage: 'url("' + url + '")' }}>
      </div>
    )
  }
}

export default class Thumbnails extends React.Component {
  render(){
    const { images, currentImage, onClickThumbnail } = this.props
    return (
      <div className={css(classes.thumbnails)}>
        {images.map((img, idx) => (
          <Thumbnail key={idx} 
                     {...img} 
                     index={idx}
                     onClickThumbnail={onClickThumbnail}
                     active={idx === currentImage} />
        ))}
      </div>
    )
  }
}