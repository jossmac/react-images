'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _glam = require('glam');

var _glam2 = _interopRequireDefault(_glam);

var _rafSchd = require('raf-schd');

var _rafSchd2 = _interopRequireDefault(_rafSchd);

var _reactViewPager = require('react-view-pager');

var _defaultComponents = require('./defaultComponents');

var _styles = require('../styles');

require('./Modal/Modal');

var _utils = require('../utils');

var _formatters = require('../formatters');

var _formatters2 = _interopRequireDefault(_formatters);

require('../types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// @jsx glam


var viewPagerStyles = { flex: '1 1 auto', position: 'relative' };
var frameStyles = { outline: 0 };

var defaultProps = {
  currentIndex: 0,
  formatters: _formatters2.default,
  hideControlsWhenIdle: 3000,
  styles: {},
  trackProps: {
    instant: !(0, _utils.isTouch)(),
    swipe: 'touch'
  }
};

var Carousel = function (_Component) {
  _inherits(Carousel, _Component);

  function Carousel(props) {
    _classCallCheck(this, Carousel);

    var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

    _initialiseProps.call(_this);

    _this.cacheComponents(props.components);

    _this.state = {
      currentIndex: props.currentIndex,
      interactionIsIdle: (0, _utils.isTouch)()
    };
    return _this;
  } // TODO


  _createClass(Carousel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          hideControlsWhenIdle = _props.hideControlsWhenIdle,
          modalProps = _props.modalProps;

      var isModal = Boolean(modalProps);

      this.mounted = true;

      if (hideControlsWhenIdle && this.container) {
        this.container.addEventListener('mousedown', this.handleMouseActivity);
        this.container.addEventListener('mousemove', this.handleMouseActivity);
        this.container.addEventListener('touchmove', this.handleMouseActivity);
      }
      if (isModal) {
        this.focusViewFrame();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.components !== this.props.components) {
        this.cacheComponents(nextProps.components);
      }

      if (this.props.currentIndex !== nextProps.currentIndex) {
        this.setState({ currentIndex: nextProps.currentIndex });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;

      if (this.props.hideControlsWhenIdle && this.container) {
        this.container.removeEventListener('mousedown', this.handleMouseActivity);
        this.container.removeEventListener('mousemove', this.handleMouseActivity);
        this.container.removeEventListener('touchmove', this.handleMouseActivity);
        this.handleMouseActivity.cancel();
      }
    }

    // ==============================
    // Refs
    // ==============================

    // ==============================
    // Utilities
    // ==============================

    // combine defaultProps with consumer props to maintain expected behaviour

    // combine defaultProps with consumer props to maintain expected behaviour


    // ==============================
    // Handlers
    // ==============================

    // ==============================
    // Renderers
    // ==============================

  }, {
    key: 'getCommonProps',
    value: function getCommonProps() {
      var _props2 = this.props,
          frameProps = _props2.frameProps,
          trackProps = _props2.trackProps,
          modalProps = _props2.modalProps,
          views = _props2.views;

      var isModal = Boolean(modalProps);
      var isFullscreen = Boolean(modalProps && modalProps.isFullscreen);
      var _state = this.state,
          currentIndex = _state.currentIndex,
          interactionIsIdle = _state.interactionIsIdle;

      var currentView = this.getViewData();

      return {
        carouselProps: this.props,
        currentIndex: currentIndex,
        currentView: currentView,
        formatters: this.props.formatters,
        frameProps: frameProps,
        getStyles: this.getStyles,
        isFullscreen: isFullscreen,
        isModal: isModal,
        modalProps: modalProps,
        interactionIsIdle: interactionIsIdle,
        trackProps: trackProps,
        views: views
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _components = this.components,
          Container = _components.Container,
          View = _components.View;
      var currentIndex = this.state.currentIndex;
      var _props3 = this.props,
          frameProps = _props3.frameProps,
          views = _props3.views;

      var commonProps = this.commonProps = this.getCommonProps();

      return (0, _glam2.default)(
        Container,
        _extends({}, commonProps, { innerProps: { innerRef: this.getContainer } }),
        this.renderHeader(),
        (0, _glam2.default)(
          _reactViewPager.ViewPager,
          {
            tag: 'main',
            style: viewPagerStyles,
            className: (0, _utils.className)('pager')
          },
          (0, _glam2.default)(
            _reactViewPager.Frame,
            _extends({}, frameProps, {
              ref: this.getFrame,
              className: (0, _utils.className)('frame'),
              style: frameStyles
            }),
            (0, _glam2.default)(
              _reactViewPager.Track,
              _extends({}, this.getTrackProps(this.props), {
                style: { display: 'flex', alignItems: 'center' },
                currentView: currentIndex,
                className: (0, _utils.className)('track'),
                onViewChange: this.handleViewChange,
                ref: this.getTrack
              }),
              views && views.map(function (data, index) {
                return (0, _glam2.default)(
                  _reactViewPager.View,
                  { className: (0, _utils.className)('view-wrapper'), key: index },
                  (0, _glam2.default)(View, _extends({}, commonProps, { data: data, index: index }))
                );
              })
            )
          ),
          this.renderNavigation()
        ),
        this.renderFooter()
      );
    }
  }]);

  return Carousel;
}(_react.Component);

Carousel.defaultProps = defaultProps;

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.mounted = false;

  this.cacheComponents = function (comps) {
    _this2.components = (0, _defaultComponents.defaultCarouselComponents)(comps);
  };

  this.getContainer = function (ref) {
    _this2.container = ref;
  };

  this.getFooter = function (ref) {
    _this2.footer = ref;
  };

  this.getFrame = function (ref) {
    _this2.frame = (0, _reactDom.findDOMNode)(ref);
  };

  this.getHeader = function (ref) {
    _this2.header = ref;
  };

  this.getTrack = function (ref) {
    _this2.track = ref;
  };

  this.hasPreviousView = function () {
    var trackProps = _this2.props.trackProps;
    var currentIndex = _this2.state.currentIndex;


    return trackProps.infinite || currentIndex !== 0;
  };

  this.hasNextView = function () {
    var _props4 = _this2.props,
        trackProps = _props4.trackProps,
        views = _props4.views;
    var currentIndex = _this2.state.currentIndex;


    return trackProps.infinite || currentIndex !== views.length - 1;
  };

  this.getStyles = function (key, props) {
    var base = _styles.defaultCarouselStyles[key](props);
    base.boxSizing = 'border-box';
    var custom = _this2.props.styles[key];
    return custom ? custom(base, props) : base;
  };

  this.getTrackProps = function (props) {
    return _extends({}, defaultProps.trackProps, props.trackProps);
  };

  this.getFormatters = function () {
    return _extends({}, defaultProps.formatters, _this2.props.formatters);
  };

  this.getViewData = function () {
    var views = _this2.props.views;
    var currentIndex = _this2.state.currentIndex;


    return views[currentIndex];
  };

  this.focusViewFrame = function () {
    if (_this2.frame && document.activeElement !== _this2.frame) {
      _this2.frame.focus();
    }
  };

  this.prev = function () {
    _this2.track.prev();
    _this2.focusViewFrame();
  };

  this.next = function () {
    _this2.track.next();
    _this2.focusViewFrame();
  };

  this.handleMouseActivity = (0, _rafSchd2.default)(function () {
    clearTimeout(_this2.timer);

    if (_this2.state.interactionIsIdle) {
      _this2.setState({ interactionIsIdle: false });
    }

    _this2.timer = setTimeout(function () {
      if (_this2.mounted) {
        _this2.setState({ interactionIsIdle: true });
      }
    }, _this2.props.hideControlsWhenIdle);
  });

  this.handleViewChange = function (indicies) {
    var trackProps = _this2.props.trackProps;

    // simplify by enforcing number

    var currentIndex = indicies[0];

    _this2.setState({ currentIndex: currentIndex });

    // call the consumer's onViewChange fn
    if (trackProps && trackProps.onViewChange) {
      trackProps.onViewChange(currentIndex);
    }
  };

  this.renderNavigation = function () {
    var _getFormatters = _this2.getFormatters(),
        getNextLabel = _getFormatters.getNextLabel,
        getPrevLabel = _getFormatters.getPrevLabel,
        getNextTitle = _getFormatters.getNextTitle,
        getPrevTitle = _getFormatters.getPrevTitle;

    var _components2 = _this2.components,
        Navigation = _components2.Navigation,
        NavigationPrev = _components2.NavigationPrev,
        NavigationNext = _components2.NavigationNext;
    var commonProps = _this2.commonProps;


    var showPrev = _this2.hasPreviousView();
    var showNext = _this2.hasNextView();
    var showNav = (showPrev || showNext) && Navigation;

    return showNav ? (0, _glam2.default)(
      Navigation,
      commonProps,
      showPrev && (0, _glam2.default)(NavigationPrev, _extends({}, commonProps, {
        align: 'left',
        innerProps: {
          'aria-label': getPrevLabel(commonProps),
          onClick: _this2.prev,
          title: getPrevTitle(commonProps)
        }
      })),
      showNext && (0, _glam2.default)(NavigationNext, _extends({}, commonProps, {
        align: 'right',
        innerProps: {
          'aria-label': getNextLabel(commonProps),
          onClick: _this2.next,
          title: getNextTitle(commonProps)
        }
      }))
    ) : null;
  };

  this.renderFooter = function () {
    var _components3 = _this2.components,
        Footer = _components3.Footer,
        FooterCaption = _components3.FooterCaption,
        FooterCount = _components3.FooterCount;
    var commonProps = _this2.commonProps;


    return Footer ? (0, _glam2.default)(Footer, _extends({}, commonProps, {
      components: {
        Caption: FooterCaption,
        Count: FooterCount
      },
      innerProps: { innerRef: _this2.getFooter }
    })) : null;
  };

  this.renderHeader = function () {
    var _components4 = _this2.components,
        Header = _components4.Header,
        HeaderClose = _components4.HeaderClose,
        HeaderFullscreen = _components4.HeaderFullscreen;

    var _getFormatters2 = _this2.getFormatters(),
        getCloseLabel = _getFormatters2.getCloseLabel,
        getFullscreenLabel = _getFormatters2.getFullscreenLabel;

    var commonProps = _this2.commonProps;


    return Header ? (0, _glam2.default)(Header, _extends({}, commonProps, {
      getCloseLabel: getCloseLabel,
      getFullscreenLabel: getFullscreenLabel,
      components: {
        CloseButton: HeaderClose,
        FullscreenButton: HeaderFullscreen
      },
      data: _this2.getViewData(),
      innerProps: { innerRef: _this2.getHeader }
    })) : null;
  };
};

exports.default = Carousel;