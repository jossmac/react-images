'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationNext = exports.navigationNextCSS = exports.NavigationPrev = exports.navigationPrevCSS = exports.navigationItemCSS = exports.Navigation = exports.navigationCSS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glam = require('glam');

var _glam2 = _interopRequireDefault(_glam);

var _primitives = require('../primitives');

require('../types');

var _utils = require('../utils');

var _svg = require('./svg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// @jsx glam


// ==============================
// Navigation
// ==============================

var navigationCSS = exports.navigationCSS = function navigationCSS(_ref) {
  var interactionIsIdle = _ref.interactionIsIdle;
  return {
    display: 'flex ',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: interactionIsIdle ? 0 : 1,
    transition: 'opacity 300ms'
  };
};

var Navigation = exports.Navigation = function Navigation(props) {
  var children = props.children,
      getStyles = props.getStyles,
      isFullscreen = props.isFullscreen,
      isModal = props.isModal;

  return !(0, _utils.isTouch)() ? (0, _glam2.default)(
    _primitives.Nav,
    {
      css: getStyles('navigation', props),
      className: (0, _utils.className)('navigation', { isFullscreen: isFullscreen, isModal: isModal })
    },
    children
  ) : null;
};

// ==============================
// Nav Item
// ==============================

var BUTTON_SIZE = 50;

var navigationItemCSS = exports.navigationItemCSS = function navigationItemCSS(_ref2) {
  var _ref3;

  var align = _ref2.align;
  return _ref3 = {
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.2)',
    border: 0,
    borderRadius: '50%',
    color: 'white',
    cursor: 'pointer',
    display: 'flex ',
    fontSize: 'inherit',
    height: BUTTON_SIZE,
    justifyContent: 'center',
    marginTop: -(BUTTON_SIZE / 2),
    outline: 0,
    position: 'absolute',
    top: '50%',
    transition: 'background-color 200ms',
    width: BUTTON_SIZE
  }, _defineProperty(_ref3, align, 20), _defineProperty(_ref3, '&:hover', {
    background: 'rgba(255, 255, 255, 0.3)'
  }), _defineProperty(_ref3, '&:active', {
    background: 'rgba(255, 255, 255, 0.2)'
  }), _ref3;
};

var navigationPrevCSS = exports.navigationPrevCSS = navigationItemCSS;
var NavigationPrev = exports.NavigationPrev = function NavigationPrev(props) {
  var _props$children = props.children,
      children = _props$children === undefined ? (0, _glam2.default)(_svg.ChevronLeft, { size: 48 }) : _props$children,
      getStyles = props.getStyles,
      innerProps = props.innerProps;


  return (0, _glam2.default)(
    _primitives.Button,
    _extends({
      type: 'button',
      css: getStyles('navigationPrev', props)
    }, innerProps),
    children
  );
};

var navigationNextCSS = exports.navigationNextCSS = navigationItemCSS;
var NavigationNext = exports.NavigationNext = function NavigationNext(props) {
  var _props$children2 = props.children,
      children = _props$children2 === undefined ? (0, _glam2.default)(_svg.ChevronRight, { size: 48 }) : _props$children2,
      getStyles = props.getStyles,
      innerProps = props.innerProps;


  return (0, _glam2.default)(
    _primitives.Button,
    _extends({
      type: 'button',
      css: getStyles('navigationNext', props)
    }, innerProps),
    children
  );
};