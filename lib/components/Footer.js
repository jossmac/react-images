'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FooterCount = exports.footerCountCSS = exports.FooterCaption = exports.footerCaptionCSS = exports.footerCSS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _glam = require('glam');

var _glam2 = _interopRequireDefault(_glam);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cssHelpers = require('./css-helpers');

var _primitives = require('../primitives');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// @jsx glam


var footerCSS = exports.footerCSS = function footerCSS(_ref) {
  var isModal = _ref.isModal,
      interactionIsIdle = _ref.interactionIsIdle;
  return _defineProperty({
    alignItems: 'top',
    bottom: isModal ? 0 : null,
    color: isModal ? 'rgba(255, 255, 255, 0.9)' : '#666',
    display: 'flex ',
    flex: '0 0 auto',
    fontSize: 13,
    justifyContent: 'space-between',
    left: isModal ? 0 : null,
    opacity: interactionIsIdle && isModal ? 0 : 1,
    padding: isModal ? '30px 20px 20px' : '10px 0',
    position: isModal ? 'absolute' : null,
    right: isModal ? 0 : null,
    transform: isModal ? 'translateY(' + (interactionIsIdle ? 10 : 0) + 'px)' : null,
    transition: 'opacity 300ms, transform 300ms',
    zIndex: isModal ? 1 : null

  }, _cssHelpers.smallDevice, {
    padding: isModal ? '20px 15px 15px' : '5px 0'
  });
};

var Footer = function Footer(props) {
  var components = props.components,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isFullscreen = props.isFullscreen,
      isModal = props.isModal;


  var style = isModal ? { background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.33))' } : null;

  var state = { isFullscreen: isFullscreen, isModal: isModal };
  var cn = {
    container: (0, _utils.className)('footer', state),
    caption: (0, _utils.className)('footer__caption', state),
    count: (0, _utils.className)('footer__count', state)
  };
  var css = {
    container: getStyles('footer', props),
    caption: getStyles('footerCaption', props),
    count: getStyles('footerCount', props)
  };
  var Caption = components.Caption,
      Count = components.Count;


  return (0, _glam2.default)(
    _primitives.Div,
    _extends({
      css: css.container,
      className: cn.container
      // TODO glam prefixer fails on gradients
      // https://github.com/threepointone/glam/issues/35
      , style: style
    }, innerProps),
    (0, _glam2.default)(Caption, props),
    (0, _glam2.default)(Count, props)
  );
};

// ==============================
// Inner Elements
// ==============================

var footerCaptionCSS = exports.footerCaptionCSS = function footerCaptionCSS() {
  return {};
};

var FooterCaption = exports.FooterCaption = function FooterCaption(props) {
  var currentView = props.currentView,
      getStyles = props.getStyles,
      isFullscreen = props.isFullscreen,
      isModal = props.isModal;
  var caption = currentView.caption;

  var state = { isFullscreen: isFullscreen, isModal: isModal };

  return (0, _glam2.default)(
    _primitives.Span,
    {
      css: getStyles('footerCaption', props),
      className: (0, _utils.className)('footer__caption', state)
    },
    caption
  );
};

var footerCountCSS = exports.footerCountCSS = function footerCountCSS() {
  return { flexShrink: 0, marginLeft: '1em' };
};

var FooterCount = exports.FooterCount = function FooterCount(props) {
  var currentIndex = props.currentIndex,
      getStyles = props.getStyles,
      isFullscreen = props.isFullscreen,
      isModal = props.isModal,
      views = props.views;

  var state = { isFullscreen: isFullscreen, isModal: isModal };
  var activeView = currentIndex + 1;
  var totalViews = views.length;

  if (!activeView || !totalViews) return null;

  return (0, _glam2.default)(
    _primitives.Span,
    {
      css: getStyles('footerCount', props),
      className: (0, _utils.className)('footer__count', state)
    },
    activeView,
    ' of ',
    totalViews
  );
};

exports.default = Footer;