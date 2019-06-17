'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Span = exports.Nav = exports.Img = exports.Div = exports.Button = exports.A = exports.Base = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glam = require('glam');

var _glam2 = _interopRequireDefault(_glam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// @jsx glam


var Base = function Base(_ref) {
  var css = _ref.css,
      innerRef = _ref.innerRef,
      Tag = _ref.tag,
      props = _objectWithoutProperties(_ref, ['css', 'innerRef', 'tag']);

  return (0, _glam2.default)(Tag, _extends({
    ref: innerRef,
    css: _extends({
      boxSizing: 'border-box'
    }, css)
  }, props));
};

exports.Base = Base;
var A = exports.A = function A(props) {
  return (0, _glam2.default)(Base, _extends({ tag: 'a' }, props));
};
var Button = exports.Button = function Button(props) {
  return (0, _glam2.default)(Base, _extends({ tag: 'button' }, props));
};
var Div = exports.Div = function Div(props) {
  return (0, _glam2.default)(Base, _extends({ tag: 'div' }, props));
};
var Img = exports.Img = function Img(props) {
  return (0, _glam2.default)(Base, _extends({ tag: 'img' }, props));
};
var Nav = exports.Nav = function Nav(props) {
  return (0, _glam2.default)(Base, _extends({ tag: 'nav' }, props));
};
var Span = exports.Span = function Span(props) {
  return (0, _glam2.default)(Base, _extends({ tag: 'span' }, props));
};