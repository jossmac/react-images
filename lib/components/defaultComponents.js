'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultModalComponents = exports.modalComponents = exports.defaultCarouselComponents = exports.carouselComponents = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Navigation = require('./Navigation');

var _styled = require('./Modal/styled');

var _View = require('./View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var carouselComponents = exports.carouselComponents = {
  Container: _Container2.default,
  Footer: _Footer2.default,
  FooterCaption: _Footer.FooterCaption,
  FooterCount: _Footer.FooterCount,
  Header: _Header2.default,
  HeaderClose: _Header.HeaderClose,
  HeaderFullscreen: _Header.HeaderFullscreen,
  Navigation: _Navigation.Navigation,
  NavigationPrev: _Navigation.NavigationPrev,
  NavigationNext: _Navigation.NavigationNext,
  View: _View2.default
};

var defaultCarouselComponents = exports.defaultCarouselComponents = function defaultCarouselComponents(providedComponents) {
  return _extends({}, carouselComponents, providedComponents);
};

// ==============================
// Modal
// ==============================

var modalComponents = exports.modalComponents = {
  Blanket: _styled.Blanket,
  Positioner: _styled.Positioner,
  Dialog: _styled.Dialog
};

var defaultModalComponents = exports.defaultModalComponents = function defaultModalComponents(providedComponents) {
  return _extends({}, modalComponents, providedComponents);
};