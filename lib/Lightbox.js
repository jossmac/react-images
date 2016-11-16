'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphroditeNoImportant = require('aphrodite/no-important');

var _reactScrolllock = require('react-scrolllock');

var _reactScrolllock2 = _interopRequireDefault(_reactScrolllock);

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

var _componentsArrow = require('./components/Arrow');

var _componentsArrow2 = _interopRequireDefault(_componentsArrow);

var _componentsContainer = require('./components/Container');

var _componentsContainer2 = _interopRequireDefault(_componentsContainer);

var _componentsFooter = require('./components/Footer');

var _componentsFooter2 = _interopRequireDefault(_componentsFooter);

var _componentsHeader = require('./components/Header');

var _componentsHeader2 = _interopRequireDefault(_componentsHeader);

var _componentsPaginatedThumbnails = require('./components/PaginatedThumbnails');

var _componentsPaginatedThumbnails2 = _interopRequireDefault(_componentsPaginatedThumbnails);

var _componentsPortal = require('./components/Portal');

var _componentsPortal2 = _interopRequireDefault(_componentsPortal);

var _utils = require('./utils');

var Lightbox = (function (_Component) {
	_inherits(Lightbox, _Component);

	function Lightbox() {
		_classCallCheck(this, Lightbox);

		_get(Object.getPrototypeOf(Lightbox.prototype), 'constructor', this).call(this);

		_utils.bindFunctions.call(this, ['gotoNext', 'gotoPrev', 'handleKeyboardInput']);
	}

	_createClass(Lightbox, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				theme: this.props.theme
			};
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.isOpen && this.props.enableKeyboardInput) {
				window.addEventListener('keydown', this.handleKeyboardInput);
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (!_utils.canUseDom) return;

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

			// add/remove event listeners
			if (!this.props.isOpen && nextProps.isOpen && nextProps.enableKeyboardInput) {
				window.addEventListener('keydown', this.handleKeyboardInput);
			}
			if (!nextProps.isOpen && nextProps.enableKeyboardInput) {
				window.removeEventListener('keydown', this.handleKeyboardInput);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.props.enableKeyboardInput) {
				window.removeEventListener('keydown', this.handleKeyboardInput);
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
				// left
				this.gotoPrev(event);
				return true;
			} else if (event.keyCode === 39) {
				// right
				this.gotoNext(event);
				return true;
			} else if (event.keyCode === 27) {
				// esc
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

			return _react2['default'].createElement(_componentsArrow2['default'], {
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

			return _react2['default'].createElement(_componentsArrow2['default'], {
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

			if (!isOpen) return _react2['default'].createElement('span', { key: 'closed' });

			var offsetThumbnails = 0;
			if (showThumbnails) {
				offsetThumbnails = _theme2['default'].thumbnail.size + _theme2['default'].container.gutter.vertical;
			}

			return _react2['default'].createElement(
				_componentsContainer2['default'],
				{
					key: 'open',
					onClick: !!backdropClosesModal && onClose,
					onTouchEnd: !!backdropClosesModal && onClose
				},
				_react2['default'].createElement(
					'div',
					{ className: (0, _aphroditeNoImportant.css)(classes.content), style: { marginBottom: offsetThumbnails, maxWidth: width } },
					_react2['default'].createElement(_componentsHeader2['default'], {
						customControls: customControls,
						onClose: onClose,
						showCloseButton: showCloseButton
					}),
					this.renderImages()
				),
				this.renderThumbnails(),
				this.renderArrowPrev(),
				this.renderArrowNext(),
				_react2['default'].createElement(_reactScrolllock2['default'], null)
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
				_react2['default'].createElement(_componentsFooter2['default'], {
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

			return _react2['default'].createElement(_componentsPaginatedThumbnails2['default'], {
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
				_componentsPortal2['default'],
				null,
				this.renderDialog()
			);
		}
	}]);

	return Lightbox;
})(_react.Component);

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
	showCloseButton: _react.PropTypes.bool,
	showImageCount: _react.PropTypes.bool,
	showThumbnails: _react.PropTypes.bool,
	theme: _react.PropTypes.object,
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
	theme: {},
	thumbnailOffset: 2,
	width: 1024
};
Lightbox.childContextTypes = {
	theme: _react.PropTypes.object.isRequired
};

var classes = _aphroditeNoImportant.StyleSheet.create({
	content: {
		position: 'relative'
	},
	figure: {
		margin: 0 },
	// remove browser default
	image: {
		display: 'block', // removes browser default gutter
		height: 'auto',
		margin: '0 auto', // maintain center on very short screens OR very narrow image
		maxWidth: '100%',

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none'
	}
});

exports['default'] = Lightbox;
module.exports = exports['default'];
/*
Re-implement when react warning "unknown props"
https://fb.me/react-unknown-prop is resolved
<Swipeable onSwipedLeft={this.gotoNext} onSwipedRight={this.gotoPrev} />
*/