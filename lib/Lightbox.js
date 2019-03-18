'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphrodite = require('aphrodite');

var _reactScrolllock = require('react-scrolllock');

var _reactScrolllock2 = _interopRequireDefault(_reactScrolllock);

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

var _Arrow = require('./components/Arrow');

var _Arrow2 = _interopRequireDefault(_Arrow);

var _Container = require('./components/Container');

var _Container2 = _interopRequireDefault(_Container);

var _Caption = require('./components/Caption');

var _Caption2 = _interopRequireDefault(_Caption);

var _BigContainer = require('./components/BigContainer');

var _BigContainer2 = _interopRequireDefault(_BigContainer);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _PaginatedThumbnails = require('./components/PaginatedThumbnails');

var _PaginatedThumbnails2 = _interopRequireDefault(_PaginatedThumbnails);

var _Portal = require('./components/Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _Spinner = require('./components/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _bindFunctions = require('./utils/bindFunctions');

var _bindFunctions2 = _interopRequireDefault(_bindFunctions);

var _canUseDom = require('./utils/canUseDom');

var _canUseDom2 = _interopRequireDefault(_canUseDom);

var _deepMerge = require('./utils/deepMerge');

var _deepMerge2 = _interopRequireDefault(_deepMerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// consumers sometimes provide incorrect type or casing
function normalizeSourceSet(data) {
	var sourceSet = data.srcSet || data.srcset;

	if (Array.isArray(sourceSet)) {
		return sourceSet.join();
	}

	return sourceSet;
}

var Lightbox = function (_Component) {
	_inherits(Lightbox, _Component);

	function Lightbox(props) {
		_classCallCheck(this, Lightbox);

		var _this = _possibleConstructorReturn(this, (Lightbox.__proto__ || Object.getPrototypeOf(Lightbox)).call(this, props));

		_this.theme = (0, _deepMerge2.default)(_theme2.default, props.theme);
		_this.classes = _aphrodite.StyleSheet.create((0, _deepMerge2.default)(defaultStyles, _this.theme));
		_this.state = { imageLoaded: false };

		_bindFunctions2.default.call(_this, ['gotoNext', 'gotoPrev', 'closeBackdrop', 'handleKeyboardInput', 'handleImageLoaded']);
		return _this;
	}

	_createClass(Lightbox, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				theme: this.theme
			};
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.isOpen) {
				if (this.props.enableKeyboardInput) {
					window.addEventListener('keydown', this.handleKeyboardInput);
				}
				if (typeof this.props.currentImage === 'number') {
					this.preloadImage(this.props.currentImage, this.handleImageLoaded);
				}
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (!_canUseDom2.default) return;

			// preload images
			if (nextProps.preloadNextImage) {
				var currentIndex = this.props.currentImage;
				var nextIndex = nextProps.currentImage + 1;
				var prevIndex = nextProps.currentImage - 1;
				var preloadIndex = void 0;

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

			// preload current image
			if (this.props.currentImage !== nextProps.currentImage || !this.props.isOpen && nextProps.isOpen) {
				var img = this.preloadImage(nextProps.currentImage, this.handleImageLoaded);
				this.setState({ imageLoaded: img.complete });
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
		value: function preloadImage(idx, onload) {
			var data = this.props.images[idx];

			if (!data) return;

			var img = new Image();
			var sourceSet = normalizeSourceSet(data);

			// TODO: add error handling for missing images
			img.onerror = onload;
			img.onload = onload;
			img.src = data.src;

			if (sourceSet) img.srcset = sourceSet;

			return img;
		}
	}, {
		key: 'gotoNext',
		value: function gotoNext(event) {
			var _props = this.props,
			    currentImage = _props.currentImage,
			    images = _props.images;
			var imageLoaded = this.state.imageLoaded;


			if (!imageLoaded || currentImage === images.length - 1) return;

			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			this.props.onClickNext();
		}
	}, {
		key: 'gotoPrev',
		value: function gotoPrev(event) {
			var currentImage = this.props.currentImage;
			var imageLoaded = this.state.imageLoaded;


			if (!imageLoaded || currentImage === 0) return;

			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			this.props.onClickPrev();
		}
	}, {
		key: 'closeBackdrop',
		value: function closeBackdrop(event) {
			// make sure event only happens if they click the backdrop
			// and if the caption is widening the figure element let that respond too
			if (event.target.id === 'lightboxBackdrop' || event.target.tagName === 'FIGURE') {
				this.props.onClose();
			}
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
	}, {
		key: 'handleImageLoaded',
		value: function handleImageLoaded() {
			this.setState({ imageLoaded: true });
		}

		// ==============================
		// RENDERERS
		// ==============================

	}, {
		key: 'renderArrowPrev',
		value: function renderArrowPrev() {
			if (this.props.currentImage === 0) return null;

			return _react2.default.createElement(_Arrow2.default, {
				direction: 'left',
				icon: 'arrowLeft',
				onClick: this.gotoPrev,
				title: this.props.leftArrowTitle,
				type: 'button'
			});
		}
	}, {
		key: 'renderArrowNext',
		value: function renderArrowNext() {
			if (this.props.currentImage === this.props.images.length - 1) return null;

			return _react2.default.createElement(_Arrow2.default, {
				direction: 'right',
				icon: 'arrowRight',
				onClick: this.gotoNext,
				title: this.props.rightArrowTitle,
				type: 'button'
			});
		}
	}, {
		key: 'renderDialog',
		value: function renderDialog() {
			var _props2 = this.props,
			    backdropClosesModal = _props2.backdropClosesModal,
			    isOpen = _props2.isOpen,
			    showThumbnails = _props2.showThumbnails,
			    width = _props2.width,
			    isImage = _props2.isImage,
			    images = _props2.images,
			    currentImage = _props2.currentImage,
			    renderCaption = _props2.renderCaption,
			    isMobile = _props2.isMobile;
			var imageLoaded = this.state.imageLoaded;


			if (!isOpen) return _react2.default.createElement('span', { key: 'closed' });

			var offsetThumbnails = 0;
			if (showThumbnails) {
				offsetThumbnails = this.theme.thumbnail.size + this.theme.container.gutter.vertical;
			}

			return _react2.default.createElement(
				_BigContainer2.default,
				{ isMobile: isMobile },
				renderCaption && _react2.default.createElement(_Caption2.default, {
					currentImage: images[currentImage],
					render: renderCaption,
					isMobile: isMobile
				}),
				_react2.default.createElement(
					_Container2.default,
					{
						key: 'open',
						onClick: backdropClosesModal && this.closeBackdrop,
						onTouchEnd: backdropClosesModal && this.closeBackdrop,
						isMobile: isMobile
					},
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							{ className: (0, _aphrodite.css)(this.classes.content), style: { marginBottom: offsetThumbnails, maxWidth: width } },
							imageLoaded && this.renderHeader(),
							isImage && this.renderImages(),
							!isImage && this.renderTexts(),
							this.renderSpinner(),
							imageLoaded && this.renderFooter()
						),
						imageLoaded && this.renderThumbnails(),
						imageLoaded && this.renderArrowPrev(),
						imageLoaded && this.renderArrowNext(),
						this.props.preventScroll && _react2.default.createElement(_reactScrolllock2.default, null)
					)
				)
			);
		}
	}, {
		key: 'renderTexts',
		value: function renderTexts() {
			var _props3 = this.props,
			    currentImage = _props3.currentImage,
			    images = _props3.images;


			if (!images || !images.length) return null;

			var image = images[currentImage];

			var _image$user = image.user,
			    user = _image$user === undefined ? {} : _image$user;
			var photo = user.photo,
			    first_name = user.first_name,
			    last_name = user.last_name,
			    display_name = user.display_name;


			return _react2.default.createElement(
				'div',
				{ className: (0, _aphrodite.css)(this.classes.figure) },
				_react2.default.createElement(
					'div',
					{ className: (0, _aphrodite.css)(this.classes.lightboxReview) },
					_react2.default.createElement(
						'p',
						{ className: (0, _aphrodite.css)(this.classes.lightboxReviewText) },
						image.content
					),
					_react2.default.createElement(
						'div',
						{ className: (0, _aphrodite.css)(this.classes.lightboxReviewUser) },
						_react2.default.createElement(
							'div',
							{ className: (0, _aphrodite.css)(this.classes.lightboxReviewUserAvatar) },
							photo ? _react2.default.createElement('img', { src: photo }) : _react2.default.createElement(
								'span',
								{ className: (0, _aphrodite.css)(this.classes.lightboxReviewUserAvatarName) },
								first_name ? first_name.charAt(0) : '',
								last_name ? last_name.charAt(0) : ''
							)
						),
						_react2.default.createElement(
							'div',
							{ className: (0, _aphrodite.css)(this.classes.lightboxReviewUserInfo) },
							_react2.default.createElement(
								'div',
								{ className: (0, _aphrodite.css)(this.classes.lightboxReviewUserInfoTop) },
								_react2.default.createElement(
									'strong',
									{ className: (0, _aphrodite.css)(this.classes.lightboxReviewUserInfoName) },
									display_name
								),
								_react2.default.createElement('div', { className: (0, _aphrodite.css)(this.classes.lightboxReviewUserInfoRating) })
							),
							_react2.default.createElement(
								'div',
								{ className: (0, _aphrodite.css)(this.classes.lightboxReviewUserInfoTime) },
								image.created
							)
						)
					)
				)
			);
		}
	}, {
		key: 'renderImages',
		value: function renderImages() {
			var _props4 = this.props,
			    currentImage = _props4.currentImage,
			    images = _props4.images,
			    onClickImage = _props4.onClickImage,
			    showThumbnails = _props4.showThumbnails;
			var imageLoaded = this.state.imageLoaded;


			if (!images || !images.length) return null;

			var image = images[currentImage];
			var sourceSet = normalizeSourceSet(image);
			var sizes = sourceSet ? '100vw' : null;

			var thumbnailsSize = showThumbnails ? this.theme.thumbnail.size : 0;
			var heightOffset = this.theme.header.height + this.theme.footer.height + thumbnailsSize + this.theme.container.gutter.vertical + 'px';

			return _react2.default.createElement(
				'figure',
				{ className: (0, _aphrodite.css)(this.classes.figure) },
				_react2.default.createElement('img', {
					className: (0, _aphrodite.css)(this.classes.image, imageLoaded && this.classes.imageLoaded),
					onClick: onClickImage,
					sizes: sizes,
					alt: image.alt,
					src: image.src,
					srcSet: sourceSet,
					style: {
						cursor: onClickImage ? 'pointer' : 'auto',
						maxHeight: 'calc(100vh - ' + heightOffset + ')'
					}
				})
			);
		}
	}, {
		key: 'renderThumbnails',
		value: function renderThumbnails() {
			var _props5 = this.props,
			    images = _props5.images,
			    currentImage = _props5.currentImage,
			    onClickThumbnail = _props5.onClickThumbnail,
			    showThumbnails = _props5.showThumbnails,
			    thumbnailOffset = _props5.thumbnailOffset;


			if (!showThumbnails) return;

			return _react2.default.createElement(_PaginatedThumbnails2.default, {
				currentImage: currentImage,
				images: images,
				offset: thumbnailOffset,
				onClickThumbnail: onClickThumbnail
			});
		}
	}, {
		key: 'renderHeader',
		value: function renderHeader() {
			var _props6 = this.props,
			    closeButtonTitle = _props6.closeButtonTitle,
			    customControls = _props6.customControls,
			    onClose = _props6.onClose,
			    showCloseButton = _props6.showCloseButton;


			return _react2.default.createElement(_Header2.default, {
				customControls: customControls,
				onClose: onClose,
				showCloseButton: showCloseButton,
				closeButtonTitle: closeButtonTitle
			});
		}
	}, {
		key: 'renderFooter',
		value: function renderFooter() {
			var _props7 = this.props,
			    currentImage = _props7.currentImage,
			    images = _props7.images,
			    imageCountSeparator = _props7.imageCountSeparator,
			    showImageCount = _props7.showImageCount;


			if (!images || !images.length) return null;

			return _react2.default.createElement(_Footer2.default, {
				caption: images[currentImage].caption,
				countCurrent: currentImage + 1,
				countSeparator: imageCountSeparator,
				countTotal: images.length,
				showCount: showImageCount
			});
		}
	}, {
		key: 'renderSpinner',
		value: function renderSpinner() {
			var _props8 = this.props,
			    spinner = _props8.spinner,
			    spinnerColor = _props8.spinnerColor,
			    spinnerSize = _props8.spinnerSize;
			var imageLoaded = this.state.imageLoaded;

			var Spinner = spinner;

			return _react2.default.createElement(
				'div',
				{ className: (0, _aphrodite.css)(this.classes.spinner, !imageLoaded && this.classes.spinnerActive) },
				_react2.default.createElement(Spinner, {
					color: spinnerColor,
					size: spinnerSize
				})
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_Portal2.default,
				null,
				this.renderDialog()
			);
		}
	}]);

	return Lightbox;
}(_react.Component);

Lightbox.propTypes = {
	backdropClosesModal: _propTypes2.default.bool,
	closeButtonTitle: _propTypes2.default.string,
	currentImage: _propTypes2.default.number,
	customControls: _propTypes2.default.arrayOf(_propTypes2.default.node),
	enableKeyboardInput: _propTypes2.default.bool,
	imageCountSeparator: _propTypes2.default.string,
	images: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		src: _propTypes2.default.string.isRequired,
		srcSet: _propTypes2.default.array,
		caption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
		thumbnail: _propTypes2.default.string
	})).isRequired,
	isMobile: _propTypes2.default.bool,
	isOpen: _propTypes2.default.bool,
	leftArrowTitle: _propTypes2.default.string,
	onClickImage: _propTypes2.default.func,
	onClickNext: _propTypes2.default.func,
	onClickPrev: _propTypes2.default.func,
	onClose: _propTypes2.default.func.isRequired,
	preloadNextImage: _propTypes2.default.bool,
	preventScroll: _propTypes2.default.bool,
	renderCaption: _propTypes2.default.func,
	rightArrowTitle: _propTypes2.default.string,
	showCloseButton: _propTypes2.default.bool,
	showImageCount: _propTypes2.default.bool,
	showThumbnails: _propTypes2.default.bool,
	spinner: _propTypes2.default.func,
	spinnerColor: _propTypes2.default.string,
	spinnerSize: _propTypes2.default.number,
	theme: _propTypes2.default.object,
	thumbnailOffset: _propTypes2.default.number,
	width: _propTypes2.default.number
};
Lightbox.defaultProps = {
	closeButtonTitle: 'Close (Esc)',
	currentImage: 0,
	enableKeyboardInput: true,
	imageCountSeparator: ' of ',
	leftArrowTitle: 'Previous (Left arrow key)',
	onClickShowNextImage: true,
	preloadNextImage: true,
	preventScroll: true,
	rightArrowTitle: 'Next (Right arrow key)',
	showCloseButton: true,
	showImageCount: true,
	spinner: _Spinner2.default,
	spinnerColor: 'white',
	spinnerSize: 100,
	theme: {},
	thumbnailOffset: 2,
	width: 1024
};
Lightbox.childContextTypes = {
	theme: _propTypes2.default.object.isRequired
};

var defaultStyles = {
	content: {
		position: 'relative'
	},
	figure: {
		margin: 0 // remove browser default
	},
	image: {
		display: 'block', // removes browser default gutter
		height: 'auto',
		margin: '0 auto', // maintain center on very short screens OR very narrow image
		maxWidth: '100%',

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none',

		// opacity animation on image load
		opacity: 0,
		transition: 'opacity 0.3s'
	},
	imageLoaded: {
		opacity: 1
	},
	spinner: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',

		// opacity animation to make spinner appear with delay
		opacity: 0,
		transition: 'opacity 0.3s'
	},
	spinnerActive: {
		opacity: 1
	},
	lightboxReview: {
		backgroundColor: '#fff',
		maxWidth: '600px',
		padding: '20px',
		fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
	},
	lightboxReviewText: {
		margin: '0',
		color: '#1C1B1B',
		lineHeight: '30px',
		fontSize: '18px',
		fontFamily: "Georgia, Times, 'Times New Roman', serif"
	},
	lightboxReviewUser: {
		marginTop: '15px'
	},
	lightboxReviewUserInfoName: {
		fontSize: '15px'
	},
	lightboxReviewUserInfoRating: {
		display: 'inline-block',
		marginLeft: '5px'
	},
	lightboxReviewUserInfo: {
		display: 'inline-block',
		verticalAlign: 'middle'
	},
	lightboxReviewUserAvatar: {
		position: 'relative',
		display: 'inline-block',
		width: '50px',
		height: '50px',
		marginRight: '10px',
		borderRadius: '50%',
		backgroundColor: '#F8F6F6',
		verticalAlign: 'middle',
		textAlign: 'center',
		overflow: 'hidden'
	},
	lightboxReviewUserAvatarName: {
		position: 'absolute',
		left: '0',
		top: '0',
		width: '100%',
		textAlign: 'center',
		lineHeight: '52px',
		textTransform: 'uppercase',
		color: '#ADADAD',
		fontSize: '18px'
	},
	lightboxReviewUserInfoTime: {
		color: '#ADADAD',
		fontSize: '13px',
		fontWeight: '300'
	}
};

exports.default = Lightbox;