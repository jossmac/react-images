'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSwipeable = require('react-swipeable');

var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);

var _reactMotion = require('react-motion');

var _aphroditeNoImportant = require('aphrodite/no-important');

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _ImageContainer = require('./ImageContainer');

var _ImageContainer2 = _interopRequireDefault(_ImageContainer);

function isImageVisible(imageIndex, deltaXWithContainerPadding) {
  var containerPadding = _theme2['default'].container.gutter.horizontal;
  var marginLeft = Math.abs(deltaXWithContainerPadding) - containerPadding;
  var visibleIndex = Math.floor(marginLeft / window.innerWidth);
  if (visibleIndex === imageIndex) {
    return true;
  }

  var isNextImageVisible = marginLeft - visibleIndex * window.innerWidth > -200;
  return isNextImageVisible && imageIndex === visibleIndex + 1;
}

var SwipeContainer = function SwipeContainer(props) {
  var currentImage = props.currentImage;
  var showThumbnails = props.showThumbnails;
  var images = props.images;
  var onSwiping = props.onSwiping;
  var onStopSwiping = props.onStopSwiping;

  var offsetThumbnails = 0;
  if (showThumbnails) {
    offsetThumbnails = _theme2['default'].thumbnail.size + _theme2['default'].container.gutter.vertical;
  }

  var horizontalPadding = _theme2['default'].container.gutter.horizontal;
  var springConfig = { stiffness: 300, damping: 30 };
  var swipeDeltaX = props.deltaX;
  var motionStyle = { deltaX: (0, _reactMotion.spring)(-currentImage * window.innerWidth - horizontalPadding + swipeDeltaX, springConfig) };

  return _react2['default'].createElement(
    _reactSwipeable2['default'],
    {
      className: (0, _aphroditeNoImportant.css)(classes.swipeable),
      onSwiped: onStopSwiping,
      onSwiping: onSwiping,
      preventDefaultTouchmoveEvent: true,
      stopPropagation: true
    },
    _react2['default'].createElement(
      _reactMotion.Motion,
      { style: motionStyle },
      function (_ref) {
        var deltaX = _ref.deltaX;
        return _react2['default'].createElement(
          'div',
          {
            className: (0, _aphroditeNoImportant.css)(classes.swipeContainer),
            style: {
              width: window.innerWidth * images.length,
              transform: 'translate(' + deltaX + 'px, 0)',
              WebkitTransform: 'translate(' + deltaX + 'px, 0)'
            }
          },
          images.map(function (image, index) {
            return _react2['default'].createElement(_ImageContainer2['default'], _extends({
              key: index,
              index: index,
              marginBottom: offsetThumbnails,
              image: image,
              isVisible: isImageVisible(index, deltaX)
            }, props));
          })
        );
      }
    )
  );
};

var classes = _aphroditeNoImportant.StyleSheet.create({
  swipeable: {
    height: '100%'
  },
  swipeContainer: {
    display: 'flex',
    height: '100%',
    willChange: 'transform'
  }
});

exports['default'] = SwipeContainer;
module.exports = exports['default'];