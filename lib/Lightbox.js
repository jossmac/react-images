var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import ScrollLock from 'react-scrolllock';

import defaultTheme from './theme';
import Arrow from './components/Arrow';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import PaginatedThumbnails from './components/PaginatedThumbnails';
import Portal from './components/Portal';
import DefaultSpinner from './components/Spinner';

import bindFunctions from './utils/bindFunctions';
import canUseDom from './utils/canUseDom';
import deepMerge from './utils/deepMerge';

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

		_this.theme = deepMerge(defaultTheme, props.theme);
		_this.classes = StyleSheet.create(deepMerge(defaultStyles, _this.theme));
		_this.state = { imageLoaded: false };

		bindFunctions.call(_this, ['gotoNext', 'gotoPrev', 'closeBackdrop', 'handleKeyboardInput', 'handleImageLoaded']);
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
			if (!canUseDom) return;

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
				var img = this.preloadImageData(nextProps.images[nextProps.currentImage], this.handleImageLoaded);
				if (img) this.setState({ imageLoaded: img.complete });
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
			return this.preloadImageData(this.props.images[idx], onload);
		}
	}, {
		key: 'preloadImageData',
		value: function preloadImageData(data, onload) {
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

			return React.createElement(Arrow, {
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

			return React.createElement(Arrow, {
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
			    width = _props2.width;
			var imageLoaded = this.state.imageLoaded;


			if (!isOpen) return React.createElement('span', { key: 'closed' });

			var offsetThumbnails = 0;
			if (showThumbnails) {
				offsetThumbnails = this.theme.thumbnail.size + this.theme.container.gutter.vertical;
			}

			return React.createElement(
				Container,
				{
					key: 'open',
					onClick: backdropClosesModal && this.closeBackdrop,
					onTouchEnd: backdropClosesModal && this.closeBackdrop
				},
				React.createElement(
					'div',
					null,
					React.createElement(
						'div',
						{ className: css(this.classes.content), style: { marginBottom: offsetThumbnails, maxWidth: width } },
						imageLoaded && this.renderHeader(),
						this.renderImages(),
						this.renderSpinner(),
						imageLoaded && this.renderFooter()
					),
					imageLoaded && this.renderThumbnails(),
					imageLoaded && this.renderArrowPrev(),
					imageLoaded && this.renderArrowNext(),
					this.props.preventScroll && React.createElement(ScrollLock, null)
				)
			);
		}
	}, {
		key: 'renderImages',
		value: function renderImages() {
			var _props3 = this.props,
			    currentImage = _props3.currentImage,
			    images = _props3.images,
			    onClickImage = _props3.onClickImage,
			    showThumbnails = _props3.showThumbnails;
			var imageLoaded = this.state.imageLoaded;


			if (!images || !images.length) return null;

			var image = images[currentImage];
			var sourceSet = normalizeSourceSet(image);
			var sizes = sourceSet ? '100vw' : null;

			var thumbnailsSize = showThumbnails ? this.theme.thumbnail.size : 0;
			var heightOffset = this.theme.header.height + this.theme.footer.height + thumbnailsSize + this.theme.container.gutter.vertical + 'px';

			return React.createElement(
				'figure',
				{ className: css(this.classes.figure) },
				React.createElement('img', {
					className: css(this.classes.image, imageLoaded && this.classes.imageLoaded),
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
			var _props4 = this.props,
			    images = _props4.images,
			    currentImage = _props4.currentImage,
			    onClickThumbnail = _props4.onClickThumbnail,
			    showThumbnails = _props4.showThumbnails,
			    thumbnailOffset = _props4.thumbnailOffset;


			if (!showThumbnails) return;

			return React.createElement(PaginatedThumbnails, {
				currentImage: currentImage,
				images: images,
				offset: thumbnailOffset,
				onClickThumbnail: onClickThumbnail
			});
		}
	}, {
		key: 'renderHeader',
		value: function renderHeader() {
			var _props5 = this.props,
			    closeButtonTitle = _props5.closeButtonTitle,
			    customControls = _props5.customControls,
			    onClose = _props5.onClose,
			    showCloseButton = _props5.showCloseButton;


			return React.createElement(Header, {
				customControls: customControls,
				onClose: onClose,
				showCloseButton: showCloseButton,
				closeButtonTitle: closeButtonTitle
			});
		}
	}, {
		key: 'renderFooter',
		value: function renderFooter() {
			var _props6 = this.props,
			    currentImage = _props6.currentImage,
			    images = _props6.images,
			    imageCountSeparator = _props6.imageCountSeparator,
			    showImageCount = _props6.showImageCount;


			if (!images || !images.length) return null;

			return React.createElement(Footer, {
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
			var _props7 = this.props,
			    spinner = _props7.spinner,
			    spinnerColor = _props7.spinnerColor,
			    spinnerSize = _props7.spinnerSize;
			var imageLoaded = this.state.imageLoaded;

			var Spinner = spinner;

			return React.createElement(
				'div',
				{ className: css(this.classes.spinner, !imageLoaded && this.classes.spinnerActive) },
				React.createElement(Spinner, {
					color: spinnerColor,
					size: spinnerSize
				})
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				Portal,
				null,
				this.renderDialog()
			);
		}
	}]);

	return Lightbox;
}(Component);

Lightbox.propTypes = {
	backdropClosesModal: PropTypes.bool,
	closeButtonTitle: PropTypes.string,
	currentImage: PropTypes.number,
	customControls: PropTypes.arrayOf(PropTypes.node),
	enableKeyboardInput: PropTypes.bool,
	imageCountSeparator: PropTypes.string,
	images: PropTypes.arrayOf(PropTypes.shape({
		src: PropTypes.string.isRequired,
		srcSet: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
		caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
		thumbnail: PropTypes.string
	})).isRequired,
	isOpen: PropTypes.bool,
	leftArrowTitle: PropTypes.string,
	onClickImage: PropTypes.func,
	onClickNext: PropTypes.func,
	onClickPrev: PropTypes.func,
	onClose: PropTypes.func.isRequired,
	preloadNextImage: PropTypes.bool,
	preventScroll: PropTypes.bool,
	rightArrowTitle: PropTypes.string,
	showCloseButton: PropTypes.bool,
	showImageCount: PropTypes.bool,
	showThumbnails: PropTypes.bool,
	spinner: PropTypes.func,
	spinnerColor: PropTypes.string,
	spinnerSize: PropTypes.number,
	theme: PropTypes.object,
	thumbnailOffset: PropTypes.number,
	width: PropTypes.number
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
	spinner: DefaultSpinner,
	spinnerColor: 'white',
	spinnerSize: 100,
	theme: {},
	thumbnailOffset: 2,
	width: 1024
};
Lightbox.childContextTypes = {
	theme: PropTypes.object.isRequired
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
		transition: 'opacity 0.3s',
		pointerEvents: 'none'
	},
	spinnerActive: {
		opacity: 1
	}
};

export default Lightbox;