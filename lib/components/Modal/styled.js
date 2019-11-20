'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialog = exports.dialogCSS = exports.Positioner = exports.positionerCSS = exports.Blanket = exports.blanketCSS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// @jsx glam


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glam = require('glam');

var _glam2 = _interopRequireDefault(_glam);

var _primitives = require('../../primitives');

require('../../types');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==============================
// Blanket
// ==============================

var blanketCSS = exports.blanketCSS = function blanketCSS(_ref) {
  var isFullscreen = _ref.isFullscreen;
  return {
    backgroundColor: isFullscreen ? 'black' : 'rgba(0, 0, 0, 0.8)',
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1199
  };
};

var Blanket = exports.Blanket = function Blanket(props) {
  var getStyles = props.getStyles,
      innerProps = props.innerProps,
      isFullscreen = props.isFullscreen;

  return (0, _glam2.default)(_primitives.Div, _extends({
    css: getStyles('blanket', props),
    className: (0, _utils.className)('blanket', { isFullscreen: isFullscreen })
  }, innerProps));
};

// ==============================
// Positioner
// ==============================

var positionerCSS = exports.positionerCSS = function positionerCSS() {
  return {
    alignItems: 'center',
    bottom: 0,
    display: 'flex ',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1200
  };
};

var Positioner = exports.Positioner = function Positioner(props) {
  var children = props.children,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isFullscreen = props.isFullscreen;

  return (0, _glam2.default)(
    _primitives.Div,
    _extends({
      css: getStyles('positioner', props),
      className: (0, _utils.className)('positioner', { isFullscreen: isFullscreen })
    }, innerProps),
    children
  );
};

// ==============================
// Dialog
// ==============================

var dialogCSS = exports.dialogCSS = function dialogCSS() {
  return {
    width: '100%'
  };
};

var Dialog = exports.Dialog = function Dialog(props) {
  var children = props.children,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isFullscreen = props.isFullscreen;

  return (0, _glam2.default)(
    _primitives.Div,
    _extends({
      css: getStyles('dialog', props),
      className: (0, _utils.className)('dialog', { isFullscreen: isFullscreen })
    }, innerProps),
    children
  );
};