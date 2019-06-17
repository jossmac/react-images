'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containerCSS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// @jsx glam


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glam = require('glam');

var _glam2 = _interopRequireDefault(_glam);

var _primitives = require('../primitives');

require('../types');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var containerCSS = exports.containerCSS = function containerCSS(_ref) {
  var isFullscreen = _ref.isFullscreen;
  return {
    backgroundColor: isFullscreen ? 'black' : null,
    display: 'flex ',
    flexDirection: 'column',
    height: '100%'
  };
};

var Container = function Container(props) {
  var children = props.children,
      getStyles = props.getStyles,
      isFullscreen = props.isFullscreen,
      isModal = props.isModal,
      innerProps = props.innerProps;

  return (0, _glam2.default)(
    _primitives.Div,
    _extends({
      css: getStyles('container', props),
      className: (0, _utils.className)('container', { isFullscreen: isFullscreen, isModal: isModal })
    }, innerProps),
    children
  );
};

exports.default = Container;