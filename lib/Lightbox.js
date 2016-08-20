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

var _aphroditeNoImportant = require('aphrodite/no-important');

// import Swipeable from 'react-swipeable';

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

var _Arrow = require('./Arrow');

var _Arrow2 = _interopRequireDefault(_Arrow);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

// import Thumbnails from './Thumbnails';

var _PaginatedThumbnails = require('./PaginatedThumbnails');

var _PaginatedThumbnails2 = _interopRequireDefault(_PaginatedThumbnails);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _stylesDefault = require('./styles/default');

var _stylesDefault2 = _interopRequireDefault(_stylesDefault);

var classes = _aphroditeNoImportant.StyleSheet.create(_stylesDefault2['default']);

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

		_utils2['default'].bindFunctions.call(this, ['gotoNext', 'gotoPrev', 'handleKeyboardInput']);
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

		// ==============================
		// RENDERERS
		// ==============================

	}, {
		key: 'renderArrowPrev',
		value: function renderArrowPrev() {
			if (this.props.currentImage === 0) return null;

			return _react2['default'].createElement(_Arrow2['default'], {
				direction: 'left',
				icon: 'arrowLeft',
				onClick: this.gotoPrev,
				title: 'Previous (Left arrow key)',
				type: 'button'
			});
		}
	}, {
		key: 'renderArrowNext',
		value: function renderArrowNext() {
			if (this.props.currentImage === this.props.images.length - 1) return null;

			return _react2['default'].createElement(_Arrow2['default'], {
				direction: 'right',
				icon: 'arrowRight',
				onClick: this.gotoNext,
				title: 'Previous (Right arrow key)',
				type: 'button'
			});
		}
	}, {
		key: 'renderDialog',
		value: function renderDialog() {
			var _props = this.props;
			var backdropClosesModal = _props.backdropClosesModal;
			var customControls = _props.customControls;
			var isOpen = _props.isOpen;
			var onClose = _props.onClose;
			var showCloseButton = _props.showCloseButton;
			var showThumbnails = _props.showThumbnails;
			var width = _props.width;

			if (!isOpen) return null;

			var offsetThumbnails = 0;
			if (showThumbnails) {
				offsetThumbnails = _theme2['default'].thumbnail.size + _theme2['default'].container.gutter.vertical;
			}

			return _react2['default'].createElement(
				'div',
				{
					key: 'dialog',
					className: (0, _aphroditeNoImportant.css)(classes.container),
					onClick: !!backdropClosesModal && onClose,
					onTouchEnd: !!backdropClosesModal && onClose
				},
				_react2['default'].createElement(
					'div',
					{ className: (0, _aphroditeNoImportant.css)(classes.content), style: { marginBottom: offsetThumbnails, maxWidth: width } },
					_react2['default'].createElement(_Header2['default'], {
						customControls: customControls,
						onClose: onClose,
						showCloseButton: showCloseButton
					}),
					this.renderImages()
				),
				this.renderArrowPrev(),
				this.renderArrowNext(),
				this.renderThumbnails()
			);
		}
	}, {
		key: 'renderImages',
		value: function renderImages() {
			var _props2 = this.props;
			var currentImage = _props2.currentImage;
			var images = _props2.images;
			var imageCountSeparator = _props2.imageCountSeparator;
			var onClickImage = _props2.onClickImage;
			var showImageCount = _props2.showImageCount;
			var showThumbnails = _props2.showThumbnails;

			if (!images || !images.length) return null;

			var image = images[currentImage];

			var srcset = undefined;
			var sizes = undefined;

			if (image.srcset) {
				srcset = image.srcset.join();
				sizes = '100vw';
			}

			var thumbnailsSize = showThumbnails ? _theme2['default'].thumbnail.size : 0;
			var heightOffset = _theme2['default'].header.height + _theme2['default'].footer.height + thumbnailsSize + _theme2['default'].container.gutter.vertical + 'px';

			return _react2['default'].createElement(
				'figure',
				{ className: (0, _aphroditeNoImportant.css)(classes.figure) },
				_react2['default'].createElement('img', {
					className: (0, _aphroditeNoImportant.css)(classes.image),
					onClick: !!onClickImage && onClickImage,
					sizes: sizes,
					src: image.src,
					srcSet: srcset,
					style: {
						cursor: this.props.onClickImage ? 'pointer' : 'auto',
						maxHeight: 'calc(100vh - ' + heightOffset + ')'
					}
				}),
				_react2['default'].createElement(_Footer2['default'], {
					caption: images[currentImage].caption,
					countCurrent: currentImage + 1,
					countSeparator: imageCountSeparator,
					countTotal: images.length,
					showCount: showImageCount
				})
			);
		}
	}, {
		key: 'renderThumbnails',
		value: function renderThumbnails() {
			var _props3 = this.props;
			var images = _props3.images;
			var currentImage = _props3.currentImage;
			var onClickThumbnail = _props3.onClickThumbnail;
			var showThumbnails = _props3.showThumbnails;
			var thumbnailOffset = _props3.thumbnailOffset;

			if (!showThumbnails) return;

			return _react2['default'].createElement(_PaginatedThumbnails2['default'], {
				currentImage: currentImage,
				images: images,
				offset: thumbnailOffset,
				onClickThumbnail: onClickThumbnail
			});
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
		caption: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
		thumbnail: _react.PropTypes.string
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
	showThumbnails: _react.PropTypes.bool,
	thumbnailOffset: _react.PropTypes.number,
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
	thumbnailOffset: 2,
	width: 1024
};

Lightbox.PaginatedThumbnails = _PaginatedThumbnails2['default'];

exports['default'] = Lightbox;
module.exports = exports['default'];
/*
Re-implement when react warning "unknown props"
https://fb.me/react-unknown-prop is resolved
<Swipeable onSwipedLeft={this.gotoNext} onSwipedRight={this.gotoPrev} />
*/