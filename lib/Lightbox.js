'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jss = require('jss');

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _jssCamelCase = require('jss-camel-case');

var _jssCamelCase2 = _interopRequireDefault(_jssCamelCase);

var _jssPx = require('jss-px');

var _jssPx2 = _interopRequireDefault(_jssPx);

var _jssNested = require('jss-nested');

var _jssNested2 = _interopRequireDefault(_jssNested);

var _jssVendorPrefixer = require('jss-vendor-prefixer');

var _jssVendorPrefixer2 = _interopRequireDefault(_jssVendorPrefixer);

// import Swipeable from 'react-swipeable';

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _stylesDefault = require('./styles/default');

var _stylesDefault2 = _interopRequireDefault(_stylesDefault);

var jss = (0, _jss.create)();
exports.jss = jss;
var useSheet = (0, _reactJss2['default'])(jss);
exports.useSheet = useSheet;
jss.use((0, _jssCamelCase2['default'])());
jss.use((0, _jssNested2['default'])());
jss.use((0, _jssPx2['default'])());
jss.use((0, _jssVendorPrefixer2['default'])());

var Lightbox = (function (_Component) {
	_inherits(Lightbox, _Component);

	_createClass(Lightbox, null, [{
		key: 'theme',
		value: function theme(themeStyles) {
			var extStyles = _extends({}, _stylesDefault2['default']);
			for (var key in extStyles) {
				if (key in themeStyles) {
					extStyles[key] = _extends({}, _stylesDefault2['default'][key], themeStyles[key]);
				}
			}
			return extStyles;
		}
	}]);

	function Lightbox() {
		_classCallCheck(this, Lightbox);

		_get(Object.getPrototypeOf(Lightbox.prototype), 'constructor', this).call(this);

		_utils2['default'].bindFunctions.call(this, ['close', 'gotoNext', 'gotoPrev', 'handleImageClick', 'handleKeyboardInput', 'handleResize']);

		this.state = { windowHeight: 0 };
	}

	_createClass(Lightbox, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (!_utils2['default'].canUseDom) return;

			// preload images
			if (nextProps.preloadNextImage) {
				var currentIndex = this.props.currentImage;
				var nextIndex = nextProps.currentImage + 1;
				var prevIndex = nextProps.currentImage - 1;
				var preloadIndex = undefined;

				if (currentIndex && nextProps.currentImage > currentIndex) {
					preloadIndex = nextIndex;
				} else if (currentIndex && nextProps.currentImage < currentIndex) {
					preloadIndex = prevIndex;
				}

				// if we know the user's direction just get one image
				// otherwise, to be safe, we need to grab one in each direction
				if (preloadIndex) {
					this.preloadImage(preloadIndex);
				} else {
					this.preloadImage(prevIndex);
					this.preloadImage(nextIndex);
				}
			}

			// add event listeners
			if (nextProps.enableKeyboardInput) {
				window.addEventListener('keydown', this.handleKeyboardInput);
			} else {
				window.removeEventListener('keydown', this.handleKeyboardInput);
			}
			if (nextProps.isOpen) {
				window.addEventListener('resize', this.handleResize);
				this.handleResize();
			} else {
				window.removeEventListener('resize', this.handleResize);
			}

			// handle body scroll
			if (nextProps.isOpen) {
				_utils2['default'].bodyScroll.blockScroll();
			} else {
				_utils2['default'].bodyScroll.allowScroll();
			}
		}

		// ==============================
		// METHODS
		// ==============================

	}, {
		key: 'preloadImage',
		value: function preloadImage(idx) {
			var image = this.props.images[idx];

			if (!image) return;

			var img = new Image();

			img.src = image.src;

			if (image.srcset) {
				img.srcset = image.srcset.join();
			}
		}
	}, {
		key: 'close',
		value: function close(e) {
			if (e.target.id !== 'react-images-container') return;

			if (this.props.backdropClosesModal && this.props.onClose) {
				this.props.onClose();
			}
		}
	}, {
		key: 'gotoNext',
		value: function gotoNext(event) {
			if (this.props.currentImage === this.props.images.length - 1) return;
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			this.props.onClickNext();
		}
	}, {
		key: 'gotoPrev',
		value: function gotoPrev(event) {
			if (this.props.currentImage === 0) return;
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			this.props.onClickPrev();
		}
	}, {
		key: 'handleImageClick',
		value: function handleImageClick() {
			if (!this.props.onClickImage) return;

			this.props.onClickImage();
		}
	}, {
		key: 'handleKeyboardInput',
		value: function handleKeyboardInput(event) {
			if (event.keyCode === 37) {
				this.gotoPrev(event);
				return true;
			} else if (event.keyCode === 39) {
				this.gotoNext(event);
				return true;
			} else if (event.keyCode === 27) {
				this.props.onClose();
				return true;
			}
			return false;
		}
	}, {
		key: 'handleResize',
		value: function handleResize() {
			this.setState({
				windowHeight: window.innerHeight || 0
			});
		}

		// ==============================
		// RENDERERS
		// ==============================

	}, {
		key: 'renderArrowPrev',
		value: function renderArrowPrev() {
			if (this.props.currentImage === 0) return null;
			var classes = this.props.sheet.classes;

			return _react2['default'].createElement(
				'button',
				{ title: 'Previous (Left arrow key)',
					type: 'button',
					className: classes.arrow + ' ' + classes.arrowPrev,
					onClick: this.gotoPrev,
					onTouchEnd: this.gotoPrev
				},
				_react2['default'].createElement(_Icon2['default'], { type: 'arrowLeft' })
			);
		}
	}, {
		key: 'renderArrowNext',
		value: function renderArrowNext() {
			if (this.props.currentImage === this.props.images.length - 1) return null;
			var classes = this.props.sheet.classes;

			return _react2['default'].createElement(
				'button',
				{ title: 'Next (Right arrow key)',
					type: 'button',
					className: classes.arrow + ' ' + classes.arrowNext,
					onClick: this.gotoNext,
					onTouchEnd: this.gotoNext
				},
				_react2['default'].createElement(_Icon2['default'], { type: 'arrowRight' })
			);
		}
	}, {
		key: 'renderCloseBar',
		value: function renderCloseBar() {
			var classes = this.props.sheet.classes;

			return _react2['default'].createElement(
				'div',
				{ className: classes.closeBar },
				this.renderCustomControls(),
				this.renderCloseButton()
			);
		}
	}, {
		key: 'renderCloseButton',
		value: function renderCloseButton() {
			if (!this.props.showCloseButton) return null;
			var classes = this.props.sheet.classes;

			return _react2['default'].createElement(
				'button',
				{
					title: 'Close (Esc)',
					className: classes.closeButton,
					onClick: this.props.onClose
				},
				_react2['default'].createElement(_Icon2['default'], { type: 'close' })
			);
		}
	}, {
		key: 'renderCustomControls',
		value: function renderCustomControls() {
			if (!this.props.customControls) return null;
			return this.props.customControls;
		}
	}, {
		key: 'renderDialog',
		value: function renderDialog() {
			if (!this.props.isOpen) return null;
			var classes = this.props.sheet.classes;

			return _react2['default'].createElement(
				'div',
				{ id: 'react-images-container',
					key: 'dialog',
					className: classes.container,
					onClick: this.close,
					onTouchEnd: this.close
				},
				_react2['default'].createElement('span', { className: classes.contentHeightShim }),
				_react2['default'].createElement(
					'div',
					{ className: classes.content },
					this.renderCloseBar(),
					this.renderImages()
				),
				this.renderArrowPrev(),
				this.renderArrowNext()
			);
		}
	}, {
		key: 'renderFooter',
		value: function renderFooter(caption) {
			var _props = this.props;
			var currentImage = _props.currentImage;
			var images = _props.images;
			var imageCountSeparator = _props.imageCountSeparator;
			var showImageCount = _props.showImageCount;
			var classes = this.props.sheet.classes;

			if (!caption && !showImageCount) return null;

			var imageCount = showImageCount ? _react2['default'].createElement(
				'div',
				{ className: classes.footerCount },
				currentImage + 1,
				imageCountSeparator,
				images.length
			) : null;
			var figcaption = caption ? _react2['default'].createElement(
				'figcaption',
				{ className: classes.footerCaption },
				caption
			) : null;

			return _react2['default'].createElement(
				'div',
				{ className: classes.footer },
				imageCount,
				figcaption
			);
		}
	}, {
		key: 'renderImages',
		value: function renderImages() {
			var _props2 = this.props;
			var images = _props2.images;
			var currentImage = _props2.currentImage;
			var classes = this.props.sheet.classes;
			var windowHeight = this.state.windowHeight;

			if (!images || !images.length) return null;

			var image = images[currentImage];

			var srcset = undefined;
			var sizes = undefined;

			if (image.srcset) {
				srcset = image.srcset.join();
				sizes = '100vw';
			}

			return _react2['default'].createElement(
				'figure',
				{ key: 'image ' + currentImage,
					className: classes.figure,
					style: { maxWidth: this.props.width }
				},
				_react2['default'].createElement('img', { className: classes.image,
					onClick: this.handleImageClick,
					sizes: sizes,
					src: image.src,
					srcSet: srcset,
					style: {
						cursor: this.props.onClickImage ? 'pointer' : 'auto',
						maxHeight: windowHeight
					}
				}),
				this.renderFooter(images[currentImage].caption)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				_Portal2['default'],
				null,
				this.renderDialog()
			);
		}
	}]);

	return Lightbox;
})(_react.Component);

Lightbox.displayName = 'Lightbox';

Lightbox.propTypes = {
	backdropClosesModal: _react.PropTypes.bool,
	currentImage: _react.PropTypes.number,
	customControls: _react.PropTypes.arrayOf(_react.PropTypes.node),
	enableKeyboardInput: _react.PropTypes.bool,
	imageCountSeparator: _react.PropTypes.string,
	images: _react.PropTypes.arrayOf(_react.PropTypes.shape({
		src: _react.PropTypes.string.isRequired,
		srcset: _react.PropTypes.array,
		caption: _react.PropTypes.string
	})).isRequired,
	isOpen: _react.PropTypes.bool,
	onClickImage: _react.PropTypes.func,
	onClickNext: _react.PropTypes.func,
	onClickPrev: _react.PropTypes.func,
	onClose: _react.PropTypes.func.isRequired,
	preloadNextImage: _react.PropTypes.bool,
	sheet: _react.PropTypes.object,
	showCloseButton: _react.PropTypes.bool,
	showImageCount: _react.PropTypes.bool,
	width: _react.PropTypes.number
};

Lightbox.defaultProps = {
	currentImage: 0,
	enableKeyboardInput: true,
	imageCountSeparator: ' of ',
	onClickShowNextImage: true,
	preloadNextImage: true,
	showCloseButton: true,
	showImageCount: true,
	width: 1024
};

exports['default'] = useSheet(Lightbox, _stylesDefault2['default']);
/*
Re-implement when react warning "unknown props"
https://fb.me/react-unknown-prop is resolved
<Swipeable onSwipedLeft={this.gotoNext} onSwipedRight={this.gotoPrev} />
*/