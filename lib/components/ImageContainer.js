'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphroditeNoImportant = require('aphrodite/no-important');

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

function renderImage(_ref) {
  var props = _ref.props;
  var image = _ref.image;
  var isVisible = _ref.isVisible;
  var images = props.images;
  var imageCountSeparator = props.imageCountSeparator;
  var index = props.index;
  var onClickImage = props.onClickImage;
  var showImageCount = props.showImageCount;
  var showThumbnails = props.showThumbnails;

  var srcset = undefined;
  var sizes = undefined;

  if (image.srcset) {
    srcset = image.srcset.join();
    sizes = '100vw';
  }

  var thumbnailsSize = showThumbnails ? _theme2['default'].thumbnail.size : 0;
  var heightOffset = _theme2['default'].header.height + _theme2['default'].footer.height + thumbnailsSize + _theme2['default'].container.gutter.vertical + 'px';

  return _react2['default'].createElement(
    'figure',
    { className: (0, _aphroditeNoImportant.css)(classes.figure) },
    _react2['default'].createElement('img', {
      className: (0, _aphroditeNoImportant.css)(classes.image),
      onClick: !!onClickImage && onClickImage,
      sizes: sizes,
      src: isVisible ? image.src : "data:",
      srcSet: isVisible ? srcset : null,
      style: {
        cursor: onClickImage ? 'pointer' : 'auto',
        maxHeight: 'calc(100vh - ' + heightOffset + ')'
      }
    }),
    _react2['default'].createElement(_Footer2['default'], {
      caption: image.caption,
      countCurrent: index + 1,
      countSeparator: imageCountSeparator,
      countTotal: images.length,
      showCount: showImageCount
    })
  );
}

var ImageContainer = function ImageContainer(props) {
  var customControls = props.customControls;
  var showCloseButton = props.showCloseButton;
  var width = props.width;
  var image = props.image;
  var isVisible = props.isVisible;
  var onClose = props.onClose;
  var marginBottom = props.marginBottom;

  var horizontalPadding = _theme2['default'].container.gutter.horizontal;

  return _react2['default'].createElement(
    'div',
    {
      className: (0, _aphroditeNoImportant.css)(classes.contentContainer),
      style: { width: window.innerWidth, paddingLeft: horizontalPadding, paddingRight: horizontalPadding }
    },
    _react2['default'].createElement(
      'div',
      { className: (0, _aphroditeNoImportant.css)(classes.content), style: { marginBottom: marginBottom, maxWidth: width } },
      _react2['default'].createElement(_Header2['default'], {
        customControls: customControls,
        onClose: onClose,
        showCloseButton: showCloseButton
      }),
      renderImage({ props: props, image: image, isVisible: isVisible })
    )
  );
};

var classes = _aphroditeNoImportant.StyleSheet.create({
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  content: {
    position: 'relative'
  },
  figure: {
    margin: 0 // remove browser default
  },
  image: {
    display: 'block', // removes browser default gutter
    height: 'auto',
    margin: '0 auto', // maintain center on very short screens OR very narrow image
    maxWidth: '100%',

    // disable user select
    WebkitTouchCallout: 'none',
    userSelect: 'none'
  }
});

exports['default'] = ImageContainer;
module.exports = exports['default'];