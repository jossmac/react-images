'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultModalStyles = exports.defaultCarouselStyles = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Carousel


// Modal


exports.mergeStyles = mergeStyles;

var _Container = require('./components/Container');

var _Navigation = require('./components/Navigation');

var _View = require('./components/View');

var _Header = require('./components/Header');

var _Footer = require('./components/Footer');

var _styled = require('./components/Modal/styled');

var defaultCarouselStyles = exports.defaultCarouselStyles = {
  container: _Container.containerCSS,
  footer: _Footer.footerCSS,
  footerCaption: _Footer.footerCaptionCSS,
  footerCount: _Footer.footerCountCSS,
  header: _Header.headerCSS,
  headerClose: _Header.headerCloseCSS,
  headerFullscreen: _Header.headerFullscreenCSS,
  navigation: _Navigation.navigationCSS,
  navigationPrev: _Navigation.navigationPrevCSS,
  navigationNext: _Navigation.navigationNextCSS,
  view: _View.viewCSS
};
var defaultModalStyles = exports.defaultModalStyles = {
  blanket: _styled.blanketCSS,
  dialog: _styled.dialogCSS,
  positioner: _styled.positionerCSS
};

// Merge Utility
// Allows consumers to extend a base Carousel or Modal with additional styles

function mergeStyles(source) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // initialize with source styles
  var styles = _extends({}, source);

  // massage in target styles
  Object.keys(target).forEach(function (key) {
    if (source[key]) {
      styles[key] = function (rsCss, props) {
        return target[key](source[key](rsCss, props), props);
      };
    } else {
      styles[key] = target[key];
    }
  });

  return styles;
}