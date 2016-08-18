import React from 'react'

class Thumbnail extends React.Component {
  render(){
    const { index, src, srcset, thumbnail, active, onClickThumbnail } = this.props

    const size = 64
    const url = thumbnail ? thumbnail : src
    const boxShadow = active ? 'inset 0 0 0 2px #fff' : 'inset 0 0 0 1px hsla(0,0%,100%,.2)'
    return (
      <div onClick={() => onClickThumbnail(index)}
           style={{
            display: 'inline-block',
            margin: 2,
            overflow: 'hidden',
            borderRadius: 2,
            cursor: 'pointer',
            width: size, height: size,
            backgroundImage: 'url("' + url + '")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxShadow
          }}>
      </div>
    )
  }
}

export default class Thumbnails extends React.Component {
  render(){
    const { images, currentImage, onClickThumbnail } = this.props
    return (
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 72,
        color: 'white',
        overflowX: 'scroll',
        textAlign: 'center',
        whiteSpace: 'nowrap'
      }}>
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