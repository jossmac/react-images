'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewCSS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// @jsx glam


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glam = require('glam');

var _glam2 = _interopRequireDefault(_glam);

var _primitives = require('../primitives');

require('../types');

var _utils = require('../utils');

var _componentHelpers = require('./component-helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewCSS = exports.viewCSS = function viewCSS() {
  return {
    lineHeight: 0,
    position: 'relative',
    textAlign: 'center'
  };
};

var View = function View(props) {
  var data = props.data,
      formatters = props.formatters,
      getStyles = props.getStyles,
      index = props.index,
      isFullscreen = props.isFullscreen,
      isModal = props.isModal;

  var innerProps = {
    alt: formatters.getAltText({ data: data, index: index }),
    src: (0, _componentHelpers.getSource)({ data: data, isFullscreen: isFullscreen })
  };

  return (0, _glam2.default)(
    _primitives.Div,
    {
      css: getStyles('view', props),
      className: (0, _utils.className)('view', { isFullscreen: isFullscreen, isModal: isModal })
    },
    (0, _glam2.default)(_primitives.Img, _extends({}, innerProps, {
      className: (0, _utils.className)('view-image', { isFullscreen: isFullscreen, isModal: isModal }),
      css: {
        height: 'auto',
        maxHeight: '100vh',
        maxWidth: '100%',
        userSelect: 'none'
      }
    }))
  );
};

exports.default = View;