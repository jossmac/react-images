'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glam = require('glam');

var _glam2 = _interopRequireDefault(_glam);

var _reactFullScreen = require('react-full-screen');

var _reactFullScreen2 = _interopRequireDefault(_reactFullScreen);

var _reactScrolllock = require('react-scrolllock');

var _reactScrolllock2 = _interopRequireDefault(_reactScrolllock);

var _a11yFocusStore = require('a11y-focus-store');

var _a11yFocusStore2 = _interopRequireDefault(_a11yFocusStore);

var _defaultComponents = require('../defaultComponents');

var _Animation = require('./Animation');

require('../Carousel');

var _styles = require('../../styles');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// @jsx glam


var defaultProps = {
  allowFullscreen: !(0, _utils.isTouch)(),
  closeOnBackdropClick: true,
  closeOnEsc: true,
  styles: {}
};

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  // TODO
  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _initialiseProps.call(_this);

    _this.cacheComponents(props.components);

    _this.state = { isFullscreen: false };
    return _this;
  }

  _createClass(Modal, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.components !== this.props.components) {
        this.cacheComponents(nextProps.components);
      }
    }

    // emulate `componentDidMount` & `componentWillUnmount`
    // called on complete of enter & exit transitions respectively

  }, {
    key: 'getCommonProps',
    value: function getCommonProps() {
      var isFullscreen = this.state.isFullscreen;


      return {
        getStyles: this.getStyles,
        isFullscreen: isFullscreen,
        modalProps: this.props
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _components = this.components,
          Blanket = _components.Blanket,
          Positioner = _components.Positioner,
          Dialog = _components.Dialog;
      var _props = this.props,
          allowFullscreen = _props.allowFullscreen,
          children = _props.children;
      var isFullscreen = this.state.isFullscreen;

      var commonProps = this.commonProps = this.getCommonProps();

      // $FlowFixMe
      var transitionIn = this.props.in;

      // forward props to modal for use in internal components
      var modalProps = {
        allowFullscreen: allowFullscreen,
        isFullscreen: isFullscreen,
        onClose: this.handleClose,
        toggleFullscreen: this.toggleFullscreen
      };

      // augment user carousel with modal props
      // $FlowFixMe
      var carouselComponent = (0, _react.cloneElement)(children, {
        isModal: true,
        modalProps: modalProps
      });

      return (0, _glam2.default)(
        _reactFullScreen2.default,
        { enabled: isFullscreen, onChange: this.handleFullscreenChange },
        (0, _glam2.default)(_Animation.Fade, _extends({}, commonProps, { component: Blanket, 'in': transitionIn })),
        (0, _glam2.default)(
          _Animation.SlideUp,
          _extends({}, commonProps, {
            component: Positioner,
            'in': transitionIn,
            innerProps: {
              onClick: this.handleBackdropClick
            },
            onEntered: this.modalDidMount,
            onExited: this.modalWillUnmount
          }),
          (0, _glam2.default)(
            Dialog,
            commonProps,
            carouselComponent
          ),
          (0, _glam2.default)(_reactScrolllock2.default, null)
        )
      );
    }
  }]);

  return Modal;
}(_react.Component);

Modal.defaultProps = defaultProps;

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.modalDidMount = function () {
    document.addEventListener('keyup', _this2.handleKeyUp);
    _a11yFocusStore2.default.storeFocus();
  };

  this.modalWillUnmount = function () {
    document.removeEventListener('keyup', _this2.handleKeyUp);
    _a11yFocusStore2.default.restoreFocus();
  };

  this.cacheComponents = function (comps) {
    _this2.components = (0, _defaultComponents.defaultModalComponents)(comps);
  };

  this.handleFullscreenChange = function (isFullscreen) {
    _this2.setState({ isFullscreen: isFullscreen });
  };

  this.handleKeyUp = function (event) {
    var _props2 = _this2.props,
        allowFullscreen = _props2.allowFullscreen,
        closeOnEsc = _props2.closeOnEsc;
    var isFullscreen = _this2.state.isFullscreen;

    var allowClose = event.key === 'Escape' && closeOnEsc && !isFullscreen;

    // toggle fullscreen
    if (allowFullscreen && event.key === 'f') {
      _this2.toggleFullscreen();
    }

    // close on escape when not fullscreen
    if (allowClose) _this2.handleClose(event);
  };

  this.handleBackdropClick = function (event) {
    var closeOnBackdropClick = _this2.props.closeOnBackdropClick;


    if (!event.target.classList.contains((0, _utils.className)('view')) || !closeOnBackdropClick) return;

    _this2.handleClose(event);
  };

  this.toggleFullscreen = function () {
    _this2.setState(function (state) {
      return { isFullscreen: !state.isFullscreen };
    });
  };

  this.handleClose = function (event) {
    var onClose = _this2.props.onClose;
    var isFullscreen = _this2.state.isFullscreen;

    // force exit fullscreen mode on close

    if (isFullscreen) {
      _this2.toggleFullscreen();
    }

    // call the consumer's onClose func
    onClose(event);
  };

  this.getStyles = function (key, props) {
    var base = _styles.defaultModalStyles[key](props);
    base.boxSizing = 'border-box';
    var custom = _this2.props.styles[key];
    return custom ? custom(base, props) : base;
  };
};

exports.default = Modal;