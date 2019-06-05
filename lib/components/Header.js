'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderClose = exports.headerCloseCSS = exports.HeaderFullscreen = exports.headerFullscreenCSS = exports.headerButtonCSS = exports.headerCSS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// @jsx glam


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glam = require('glam');

var _glam2 = _interopRequireDefault(_glam);

var _primitives = require('../primitives');

var _utils = require('../utils');

var _svg = require('./svg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var headerCSS = exports.headerCSS = function headerCSS(_ref) {
  var interactionIsIdle = _ref.interactionIsIdle;
  return {
    alignItems: 'center',
    display: 'flex ',
    flex: '0 0 auto',
    justifyContent: 'space-between',
    opacity: interactionIsIdle ? 0 : 1,
    padding: 10,
    paddingBottom: 20,
    position: 'absolute',
    transform: 'translateY(' + (interactionIsIdle ? -10 : 0) + 'px)',
    transition: 'opacity 300ms, transform 300ms',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1
  };
};

var Header = function Header(props) {
  var components = props.components,
      getStyles = props.getStyles,
      getCloseLabel = props.getCloseLabel,
      getFullscreenLabel = props.getFullscreenLabel,
      innerProps = props.innerProps,
      isModal = props.isModal,
      modalProps = props.modalProps;


  if (!isModal) return null;

  var allowFullscreen = modalProps.allowFullscreen,
      isFullscreen = modalProps.isFullscreen,
      onClose = modalProps.onClose,
      toggleFullscreen = modalProps.toggleFullscreen;

  var FsIcon = isFullscreen ? _svg.FullscreenExit : _svg.FullscreenEnter;
  var CloseButton = components.CloseButton,
      FullscreenButton = components.FullscreenButton;

  var state = { isFullscreen: isFullscreen, isModal: isModal };

  return (0, _glam2.default)(
    _primitives.Div,
    _extends({
      css: getStyles('header', props),
      className: (0, _utils.className)('header', state)
      // TODO glam prefixer fails on gradients
      // https://github.com/threepointone/glam/issues/35
      , style: {
        background: 'linear-gradient(rgba(0,0,0,0.33), rgba(0,0,0,0))'
      }
    }, innerProps),
    (0, _glam2.default)('span', null),
    (0, _glam2.default)(
      'span',
      null,
      allowFullscreen ? (0, _glam2.default)(
        FullscreenButton,
        {
          getStyles: getStyles,
          innerProps: {
            onClick: toggleFullscreen,
            title: getFullscreenLabel(state)
          }
        },
        (0, _glam2.default)(FsIcon, { size: 32 })
      ) : null,
      (0, _glam2.default)(
        CloseButton,
        {
          getStyles: getStyles,
          innerProps: {
            onClick: onClose,
            title: getCloseLabel(state)
          }
        },
        (0, _glam2.default)(_svg.Close, { size: 32 })
      )
    )
  );
};

// ==============================
// Header Buttons
// ==============================

var headerButtonCSS = exports.headerButtonCSS = function headerButtonCSS() {
  return {
    alignItems: 'center',
    background: 0,
    border: 0,
    color: 'rgba(255, 255, 255, 0.75)',
    cursor: 'pointer',
    display: 'inline-flex ',
    height: 44,
    justifyContent: 'center',
    outline: 0,
    padding: 0,
    position: 'relative',
    width: 44,

    '&:hover': {
      color: 'white'
    }
  };
};

var headerFullscreenCSS = exports.headerFullscreenCSS = headerButtonCSS;
var HeaderFullscreen = exports.HeaderFullscreen = function HeaderFullscreen(props) {
  var children = props.children,
      getStyles = props.getStyles,
      innerProps = props.innerProps;


  return (0, _glam2.default)(
    _primitives.Button,
    _extends({
      css: getStyles('headerFullscreen', props),
      className: (0, _utils.className)(['header_button', 'header_button--fullscreen']),
      type: 'button'
    }, innerProps),
    children
  );
};

var headerCloseCSS = exports.headerCloseCSS = headerButtonCSS;
var HeaderClose = exports.HeaderClose = function HeaderClose(props) {
  var children = props.children,
      getStyles = props.getStyles,
      innerProps = props.innerProps;


  return (0, _glam2.default)(
    _primitives.Button,
    _extends({
      css: getStyles('headerClose', props),
      className: (0, _utils.className)(['header_button', 'header_button--close']),
      type: 'button'
    }, innerProps),
    children
  );
};

exports.default = Header;